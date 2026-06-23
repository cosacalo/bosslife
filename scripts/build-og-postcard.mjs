// Comparison build: the "postcard" OG variant — same hero photo, but a clean,
// structured navy lower-band (with a thin sun divider) holding the logo, instead
// of the immersive soft scrim. Outputs public/og-image-postcard.jpg for review.
// Run: `node scripts/build-og-postcard.mjs`.
import sharp from 'sharp';

const W = 1200, H = 630;
const BAND_TOP = 430;

const photo = await sharp('public/hero-poster.jpg')
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .toBuffer();

const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#0a2f5e"/>
      <stop offset="100%" stop-color="#00102a"/>
    </linearGradient>
    <radialGradient id="vig" cx="50%" cy="38%" r="80%">
      <stop offset="60%"  stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#00040c" stop-opacity="0.34"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  <rect x="0" y="${BAND_TOP}" width="${W}" height="${H - BAND_TOP}" fill="url(#band)" fill-opacity="0.97"/>
  <rect x="0" y="${BAND_TOP - 3}" width="${W}" height="3" fill="#FCD80C" fill-opacity="0.9"/>
</svg>`;

const logo = await sharp('public/logo.png').trim().resize({ width: 340 }).png().toBuffer();
const lm = await sharp(logo).metadata();
const { data, info } = await sharp(logo).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let sx = 0, sw = 0;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const a = data[(y * info.width + x) * info.channels + 3];
    if (a > 20) { sx += x * a; sw += a; }
  }
}
const cx = sx / sw;
const left = Math.round(W / 2 - cx);
const top = Math.round((BAND_TOP + H) / 2 - lm.height / 2); // centered in the band

await sharp(photo)
  .composite([
    { input: Buffer.from(overlay), left: 0, top: 0 },
    { input: logo, left, top },
  ])
  .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
  .toFile('public/og-image-postcard.jpg');

console.log(`og-image-postcard.jpg — band top ${BAND_TOP}; logo ${lm.width}x${lm.height} at ${left},${top}`);
