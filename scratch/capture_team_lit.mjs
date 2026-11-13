import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

for (const page of ['team', 'literature']) {
  const outPath = path.join(previewsDir, `preview_cards_${page}.png`);
  execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,900 --screenshot="${outPath}" http://localhost:3000/${page}`);
  console.log(`Saved ${page}`);
}
