#!/bin/bash

BASE_URL="https://eurohotel.lviv.ua"
OUTPUT="public/sitemap.xml"

echo '<?xml version="1.0" encoding="UTF-8"?>' > $OUTPUT
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' >> $OUTPUT

find public -name "*.html" | while read file; do
  path=${file#public}
  url="$BASE_URL$path"

  echo "  <url>" >> $OUTPUT
  echo "    <loc>$url</loc>" >> $OUTPUT
  echo "    <lastmod>$(date +%F)</lastmod>" >> $OUTPUT
  echo "  </url>" >> $OUTPUT
done

echo '</urlset>' >> $OUTPUT
