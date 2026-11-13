import fs from 'fs';

const html = fs.readFileSync('public/timeline.html', 'utf8');

for (let w = 1; w <= 5; w++) {
  const marker = `id="timelineWeek${w}Container"`;
  const idx = html.indexOf(marker);
  if (idx !== -1) {
    const nextIdx = w < 5 ? html.indexOf(`id="timelineWeek${w+1}Container"`) : html.indexOf('</main>');
    const chunk = html.slice(idx, nextIdx);
    
    // Extract text blocks
    const textBlocks = [];
    const textMatches = chunk.matchAll(/<div class="timeline-block-text">([\s\S]*?)<\/div>/g);
    for (const tm of textMatches) {
      textBlocks.push(tm[1].trim());
    }

    // Extract pictures
    const pictures = [];
    const picMatches = chunk.matchAll(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/g);
    for (const pm of picMatches) {
      pictures.push({ src: pm[1], alt: pm[2] });
    }

    // Extract videos
    const videos = [];
    const vidMatches = chunk.matchAll(/<video[^>]*id="([^"]+)"[\s\S]*?<source[^>]*src="([^"]+)"/g);
    for (const vm of vidMatches) {
      videos.push({ id: vm[1], src: vm[2] });
    }

    console.log(`\n================== WEEK ${w} ==================`);
    console.log(`Text count: ${textBlocks.length}, Pictures: ${pictures.length}, Videos: ${videos.length}`);
    if (textBlocks[0]) {
      const plain = textBlocks[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 300);
      console.log(`Summary: ${plain}...`);
    }
  }
}
