// Builds public/og-image.jpg — a photographic brand OG.
// The real Sarasota hero (boat full of people, jet skis, skyline) full-bleed,
// a navy gradient lower-third for depth + legibility, a soft vignette, and the
// logo seated on the navy band (optically centered, with a soft shadow).
// Run: `node scripts/build-og.mjs`.
import sharp from 'sharp';

const W = 1200, H = 630;

const photo = await sharp('public/hero-poster.jpg')
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .toBuffer();

// Navy lower-third scrim (rich at the bottom, clear over the people + skyline)
// plus a quiet vignette to frame the photo like an editorial cover.
const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#001022" stop-opacity="0"/>
      <stop offset="55%"  stop-color="#001834" stop-opacity="0"/>
      <stop offset="72%"  stop-color="#002150" stop-opacity="0.55"/>
      <stop offset="85%"  stop-color="#001a40" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#00112e" stop-opacity="1"/>
    </linearGradient>
    <radialGradient id="vig" cx="50%" cy="40%" r="78%">
      <stop offset="58%"  stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#00040c" stop-opacity="0.42"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;

// Logo, optically centered horizontally, seated in the navy band.
const logo = await sharp('public/logo.png').trim().resize({ width: 400 }).png().toBuffer();
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
const top = H - lm.height - 36; // bottom-anchored on the navy band, fully in frame

// Soft dark shadow so the badge seats on the busy photo / navy band.
const PAD = 60;
const alpha = await sharp(logo).extractChannel('alpha').linear(0.5, 0).png().toBuffer();
const darkSil = await sharp({ create: { width: lm.width, height: lm.height, channels: 3, background: { r: 0, g: 4, b: 14 } } })
  .joinChannel(alpha).png().toBuffer();
const shadow = await sharp(darkSil)
  .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .blur(22).png().toBuffer();

await sharp(photo)
  .composite([
    { input: Buffer.from(overlay), left: 0, top: 0 },
    { input: shadow, left: left - PAD, top: top - PAD + 10 },
    { input: logo, left, top },
  ])
  .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
  .toFile('public/og-image.jpg');

console.log(`og-image.jpg — photographic; logo ${lm.width}x${lm.height} at ${left},${top}`);
