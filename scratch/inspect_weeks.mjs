import fs from 'fs';

const html = fs.readFileSync('public/timeline.html', 'utf8');
for (let w = 1; w <= 5; w++) {
  const marker = `id="timelineWeek${w}Container"`;
  const idx = html.indexOf(marker);
  if (idx !== -1) {
    const nextIdx = w < 5 ? html.indexOf(`id="timelineWeek${w+1}Container"`) : html.length;
    const block = html.slice(idx, nextIdx);
    const h4 = block.match(/<h4>([\s\S]*?)<\/h4>/)?.[1]?.replace(/\s+/g, ' ').trim();
    const imgs = [...block.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
    const vids = [...block.matchAll(/<source\s+src="([^"]+)"/g)].map(m => m[1]);
    console.log(`\n=== WEEK ${w} ===`);
    console.log(`Title: ${h4}`);
    console.log(`Images:`, imgs);
    console.log(`Videos:`, vids);
  }
}
