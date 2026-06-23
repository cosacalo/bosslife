/* ============================================================================
   Boss Life - boating forecast data layer (single source of truth).

   Pure client-side, no backend, no API keys. Three CORS-open public sources:
   Open-Meteo forecast + marine (NOAA models) and NOAA CO-OPS tides.

   Consumed by both the full /forecast page and the homepage "Today on the bay"
   band, so the fetch + derivation logic lives in exactly one place. The card
   rendering (SVGs, DOM) stays in the page; this module only fetches raw data and
   derives honest, threshold-based summaries. Real numbers only: a failed source
   is reported, never guessed.

   Safety note carried from the source spec: do NOT send a `Cache-Control`
   request header. It is not CORS-safelisted, forces a preflight, and Open-Meteo
   / NOAA do not allow it, which blocks the request. `cache: 'no-store'` keeps
   data fresh without any extra header.
   ============================================================================ */

export const COORDS = {
  lat: 27.347, lon: -82.548,   // ramp area (point forecast)
  mlat: 27.27, mlon: -82.62,   // just offshore (marine)
  station: '8726083',          // NOAA "Sarasota" tides
  area: 'Sarasota, FL',
  stationLabel: 'Sarasota Bay, NOAA #8726083',
};

/* ------------------------------------------------------------------ helpers */
export function pad2(n) { return (n < 10 ? '0' : '') + n; }

// today's date (YYYY-MM-DD) in America/New_York, regardless of viewer TZ
export function etToday() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const o = {};
  parts.forEach((p) => { o[p.type] = p.value; });
  return o.year + '-' + o.month + '-' + o.day;
}

export function shiftYmd(ymd, delta) {
  const p = ymd.split('-');
  const d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
  d.setUTCDate(d.getUTCDate() + delta);
  return d.getUTCFullYear() + '-' + pad2(d.getUTCMonth() + 1) + '-' + pad2(d.getUTCDate());
}

export function hm(s) { return { h: +s.slice(11, 13), m: +s.slice(14, 16) }; }
export function decHour(s) { const t = hm(s); return t.h + t.m / 60; }
export function fmt12(s) {
  const t = hm(s); let hh = t.h % 12; if (hh === 0) hh = 12;
  return hh + ':' + pad2(t.m) + ' ' + (t.h >= 12 ? 'PM' : 'AM');
}
export function winLabel(start, end) {
  const f = (v) => {
    const h = Math.floor(v), m = Math.round((v - h) * 60);
    let hh = h % 12; if (hh === 0) hh = 12;
    return hh + ':' + pad2(m) + ' ' + (h >= 12 ? 'PM' : 'AM');
  };
  return f(start) + ' to ' + f(end);
}
export function timeToDec(str) { const p = str.split(':'); return (+p[0]) + (+p[1]) / 60; }

const DOW = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MON = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export function dateParts(ymd) {
  const p = ymd.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2], 12, 0, 0);
  return { dow: DOW[d.getDay()], num: String(+p[2]), mo: MON[+p[1] - 1], year: p[0] };
}

export function compass(deg) {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

export function nowStampET() {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  }).format(new Date()) + ' ET';
}

/* -------------------------------------------------------------------- fetch */
export function forecastUrl(d) {
  return 'https://api.open-meteo.com/v1/forecast?latitude=' + COORDS.lat + '&longitude=' + COORDS.lon +
    '&hourly=precipitation_probability,wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_2m' +
    '&daily=sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
    '&temperature_unit=fahrenheit&wind_speed_unit=kn&timezone=America%2FNew_York&start_date=' + d + '&end_date=' + d;
}
export function marineUrl(d) {
  return 'https://marine-api.open-meteo.com/v1/marine?latitude=' + COORDS.mlat + '&longitude=' + COORDS.mlon +
    '&hourly=wave_height,wave_period,wind_wave_height,wind_wave_period' +
    '&length_unit=imperial&timezone=America%2FNew_York&start_date=' + d + '&end_date=' + d;
}
export function tidesUrl(d) {
  const b = shiftYmd(d, -1).replace(/-/g, ''), e = shiftYmd(d, 1).replace(/-/g, '');
  return 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=' + b +
    '&end_date=' + e + '&station=' + COORDS.station + '&product=predictions&datum=MLLW' +
    '&time_zone=lst_ldt&interval=hilo&units=english&format=json&application=BossLifeRentals';
}

export function getJson(url) {
  return fetch(url, { cache: 'no-store' }).then((r) => {
    if (!r.ok) throw new Error(r.status + ' ' + r.statusText);
    return r.json();
  });
}

// Fetch the three sources for a day. Returns raw payloads plus a list of any
// source errors. NOAA answers with {error} at HTTP 200 when a day has no data.
export function fetchAll(date) {
  const errors = [];
  return Promise.allSettled([getJson(forecastUrl(date)), getJson(marineUrl(date)), getJson(tidesUrl(date))])
    .then((res) => {
      const fc = res[0].status === 'fulfilled' ? res[0].value : null;
      const mar = res[1].status === 'fulfilled' ? res[1].value : null;
      let tide = res[2].status === 'fulfilled' ? res[2].value : null;
      if (res[0].status === 'rejected') errors.push('forecast: ' + res[0].reason.message);
      if (res[1].status === 'rejected') errors.push('marine: ' + res[1].reason.message);
      if (res[2].status === 'rejected') errors.push('tides: ' + res[2].reason.message);
      if (tide && tide.error) { errors.push('tides: ' + tide.error.message); tide = null; }
      return { fc, mar, tide, errors };
    });
}

// Lighter fetch for the homepage band: forecast + marine only (no tides).
export function fetchWeather(date) {
  const errors = [];
  return Promise.allSettled([getJson(forecastUrl(date)), getJson(marineUrl(date))])
    .then((res) => {
      const fc = res[0].status === 'fulfilled' ? res[0].value : null;
      const mar = res[1].status === 'fulfilled' ? res[1].value : null;
      if (res[0].status === 'rejected') errors.push('forecast: ' + res[0].reason.message);
      if (res[1].status === 'rejected') errors.push('marine: ' + res[1].reason.message);
      return { fc, mar, tide: null, errors };
    });
}

/* --------------------------------------------------------------- derivation */
// Build the structured forecast object for a date + rental window from the raw
// sources. Mutates `errors` with any per-field gaps. Throws if the core forecast
// source has no usable data (e.g. date outside the model range).
export function deriveConditions(date, fc, mar, tide, errors, winStart, winEnd) {
  const f = {
    area: COORDS.area, station: COORDS.stationLabel,
    date: dateParts(date),
    window: winLabel(winStart, winEnd),
    winStart, winEnd,
  };

  if (!fc || !fc.hourly || !fc.hourly.time || !fc.hourly.time.length) {
    throw new Error('No forecast data for ' + date + ' (it may be outside the 16-day model range).');
  }

  const H = fc.hourly, D = fc.daily, times = H.time;
  const win = [];
  for (let i = 0; i < times.length; i++) {
    const h = +times[i].slice(11, 13);
    if (h >= Math.floor(winStart) && h <= Math.ceil(winEnd)) win.push(i);
  }
  if (!win.length) for (let i = 0; i < times.length; i++) win.push(i);
  const pick = (arr) => win.map((i) => arr[i]).filter((v) => v != null);

  /* ---- wind ---- */
  const ws = pick(H.wind_speed_10m), wg = pick(H.wind_gusts_10m), wd = pick(H.wind_direction_10m);
  const wMin = Math.round(Math.min.apply(null, ws)), wMax = Math.round(Math.max.apply(null, ws));
  const gMax = wg.length ? Math.round(Math.max.apply(null, wg)) : null;
  const dStart = compass(wd[0]), dEnd = compass(wd[wd.length - 1]);
  const dir = dStart === dEnd ? dStart : dStart + '→' + dEnd; // arrow, not a dash
  let windNote;
  if (wMax < 10) windNote = 'Light and glassy.';
  else if (wMax < 15) windNote = 'Light to moderate.';
  else if (wMax < 20) windNote = 'Moderate, some chop.';
  else windNote = 'Breezy, expect a bumpy ride.';
  if (gMax && gMax >= wMax + 6) windNote += ' Gusts to ' + gMax + ' kt.';
  f.wind = { value: (wMin === wMax ? String(wMax) : wMin + '-' + wMax), unit: 'kt', dir, note: windNote, max: wMax, gustMax: gMax };

  /* ---- seas (marine) ---- */
  if (mar && mar.hourly && mar.hourly.wave_height) {
    const MH = mar.hourly, mt = MH.time, mwin = [];
    for (let j = 0; j < mt.length; j++) {
      const mh = +mt[j].slice(11, 13);
      if (mh >= Math.floor(winStart) && mh <= Math.ceil(winEnd)) mwin.push(j);
    }
    if (!mwin.length) for (let j = 0; j < mt.length; j++) mwin.push(j);
    const wav = mwin.map((k) => MH.wave_height[k]).filter((v) => v != null);
    const per = mwin.map((k) => MH.wave_period[k]).filter((v) => v != null);
    if (wav.length) {
      const maxW = Math.max.apply(null, wav);
      const avgP = per.length ? Math.round(per.reduce((a, b) => a + b, 0) / per.length) : null;
      let tag, seaNote;
      if (maxW <= 1) { tag = 'glassy'; seaNote = 'A foot or less. Easy water.'; }
      else if (maxW <= 2) { tag = 'easy'; seaNote = 'Around one to two feet.'; }
      else if (maxW <= 3) { tag = 'moderate'; seaNote = 'Two to three feet, a little bumpy.'; }
      else { tag = 'rough'; seaNote = 'Over three feet. Pick your spots.'; }
      f.seas = {
        value: maxW <= 1 ? '≤1' : (Math.round(maxW * 10) / 10).toFixed(1),
        unit: 'ft', period: avgP != null ? avgP + ' sec' : '', periodTag: tag, note: seaNote, maxW,
      };
    }
  }
  if (!f.seas) {
    errors.push('marine seas unavailable for this day');
    f.seas = { value: 'n/a', unit: '', period: '', periodTag: '', note: 'Sea-state data was not available for this day.', maxW: null };
  }

  /* ---- rain ---- */
  const hourlyRain = [];
  for (let r = 0; r < 24; r++) hourlyRain.push(H.precipitation_probability[r] == null ? 0 : H.precipitation_probability[r]);
  const tripMax = Math.max.apply(null, pick(H.precipitation_probability).concat([0]));
  const dayMax = (D && D.precipitation_probability_max) ? D.precipitation_probability_max[0] : tripMax;
  let rTag, rNote;
  if (tripMax < 10) { rTag = 'Dry on the water'; rNote = 'Skies stay dry through your window.'; }
  else if (tripMax < 30) { rTag = 'Slight chance, ~' + tripMax + '%'; rNote = 'Mostly dry. Only a slight chance near <b>' + tripMax + '%</b> in your window.'; }
  else if (tripMax < 60) { rTag = 'Scattered showers, ~' + tripMax + '%'; rNote = 'Scattered showers possible, up to about <b>' + tripMax + '%</b> in your window.'; }
  else { rTag = 'Wet, ~' + tripMax + '%'; rNote = 'A good chance of rain, up to about <b>' + tripMax + '%</b>. Keep an eye on the radar.'; }
  f.rain = { tripMax, dayMax, tag: rTag, note: rNote, hourly: hourlyRain };

  /* ---- UV ---- */
  const uvMax = (D && D.uv_index_max) ? D.uv_index_max[0] : null;
  if (uvMax != null) {
    const uvR = Math.round(uvMax); let uvCat, uvWord;
    if (uvR <= 2) { uvWord = 'Low'; uvCat = '<b>Low.</b> Easy day for the skin.'; }
    else if (uvR <= 5) { uvWord = 'Moderate'; uvCat = '<b>Moderate.</b> Sunscreen if you burn.'; }
    else if (uvR <= 7) { uvWord = 'High'; uvCat = '<b>High.</b> Sunscreen and a hat.'; }
    else if (uvR <= 10) { uvWord = 'Very high'; uvCat = '<b>Very high.</b> Sunscreen, hat, and shade.'; }
    else { uvWord = 'Extreme'; uvCat = '<b>Extreme.</b> Cover up and reapply often.'; }
    f.uv = { value: String(uvR), unit: 'of 11', note: uvCat, word: uvWord };
  } else {
    f.uv = { value: 'n/a', unit: '', note: 'UV data was not available.', word: '' };
  }

  /* ---- sun ---- */
  f.sun = (D && D.sunrise && D.sunset)
    ? { rise: fmt12(D.sunrise[0]), set: fmt12(D.sunset[0]) }
    : { rise: 'n/a', set: 'n/a' };

  /* ---- tides ---- */
  const dayTides = []; let prevAnchor = null, nextAnchor = null;
  if (tide && tide.predictions && tide.predictions.length) {
    tide.predictions.forEach((p) => {
      const d = p.t.slice(0, 10), high = (p.type === 'H');
      const ev = { type: high ? 'h' : 'l', ft: parseFloat(p.v), time: fmt12(p.t), t: decHour(p.t), date: d };
      if (d === date) dayTides.push(ev);
      else if (d < date) prevAnchor = { t: ev.t - 24, v: ev.ft };
      else if (d > date && !nextAnchor) nextAnchor = { t: ev.t + 24, v: ev.ft };
    });
  }
  f.tides = dayTides;
  f._tideAnchors = { prev: prevAnchor, next: nextAnchor };
  if (tide && !dayTides.length) errors.push('tide predictions unavailable for this day');

  /* ---- verdict (conservative, threshold-driven) ---- */
  const sMax = f.seas.maxW;
  const caution = (wMax >= 20) || (gMax && gMax >= 25) || (sMax != null && sMax > 3) || (tripMax >= 60);
  const watch = (wMax >= 15) || (sMax != null && sMax > 2) || (tripMax >= 40);
  f.verdict = {
    stamp: caution ? 'Check conditions' : (watch ? 'A bit of chop' : 'Good to go'),
    level: caution ? 'caution' : (watch ? 'watch' : 'good'),
  };
  const bits = [];
  bits.push(windNote.replace(/\.$/, '') + ', wind ' + f.wind.value + ' kt ' + dir + '.');
  if (sMax != null) bits.push('Seas ' + (f.seas.value === '≤1' ? 'a foot or less' : f.seas.value + ' ft') + '.');
  bits.push(tripMax < 10 ? 'Dry through your window.' : 'Rain chance up to <b>' + tripMax + '%</b>.');
  if (dayTides.length) {
    const hi = dayTides.filter((t) => t.type === 'h').sort((a, b) => b.ft - a.ft)[0];
    if (hi) bits.push('Highest water around <b>' + hi.time + '</b>.');
  }
  if (D && D.temperature_2m_max) bits.push('Highs near ' + Math.round(D.temperature_2m_max[0]) + '°.');
  f.verdict.note = bits.join(' ');

  f.updated = nowStampET();
  return f;
}
