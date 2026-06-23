#!/usr/bin/env bash
# Renders public/og-image.jpg from scripts/og/og.html via headless Chrome, so the
# real Bricolage Grotesque + Hanken Grotesk fonts render, then flattens to JPG.
# Usage: bash scripts/og/render.sh   (run from the site/ dir or anywhere)
set -e
cd "$(dirname "$0")/../.."   # -> site/
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
URL="file://$(python3 -c "import urllib.parse,os; print(urllib.parse.quote(os.path.abspath('scripts/og/og.html')))")"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --virtual-time-budget=5000 --window-size=1200,630 \
  --screenshot="/tmp/og-shot.png" "$URL" 2>/dev/null
node -e "require('sharp')('/tmp/og-shot.png').resize(1200,630,{fit:'cover'}).jpeg({quality:90,chromaSubsampling:'4:4:4'}).toFile('public/og-image.jpg')"
echo "public/og-image.jpg written"
