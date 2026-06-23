#!/usr/bin/env bash
# Renders the OG share images from their HTML via headless Chrome (so the real
# Bricolage Grotesque + Hanken Grotesk fonts render), then flattens each to JPG.
# Usage: bash scripts/og/render.sh   (run from anywhere)
set -e
cd "$(dirname "$0")/../.."   # -> site/
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

render() {
  local html="$1" out="$2"
  local url="file://$(python3 -c "import urllib.parse,os,sys; print(urllib.parse.quote(os.path.abspath(sys.argv[1])))" "$html")"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --allow-file-access-from-files --virtual-time-budget=5000 --window-size=1200,630 \
    --screenshot="/tmp/og-shot.png" "$url" 2>/dev/null
  node -e "require('sharp')('/tmp/og-shot.png').resize(1200,630,{fit:'cover'}).jpeg({quality:90,chromaSubsampling:'4:4:4'}).toFile('$out')"
  echo "$out written"
}

render scripts/og/og.html          public/og-image.jpg
render scripts/og/og-forecast.html public/og-forecast.jpg
