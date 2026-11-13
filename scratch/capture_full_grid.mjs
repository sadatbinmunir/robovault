import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve('previews/preview_timeline_full_grid.png');

try {
  execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,2200 --screenshot="${outPath}" http://localhost:3000/timeline`, { stdio: 'inherit' });
  console.log('Saved preview_timeline_full_grid.png');
} catch (e) {
  console.error(e.message);
}
