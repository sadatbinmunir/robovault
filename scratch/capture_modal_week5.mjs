import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve('previews/preview_timeline_modal_week5.png');

try {
  execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=3000 --window-size=1440,1100 --screenshot="${outPath}" "http://localhost:3000/timeline#week-5"`, { stdio: 'inherit' });
  console.log('Saved preview_timeline_modal_week5.png');
} catch (e) {
  console.error(e.message);
}
