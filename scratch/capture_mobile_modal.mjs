import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve('previews/preview_timeline_mobile_modal.png');

try {
  execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=3000 --window-size=390,844 --screenshot="${outPath}" "http://localhost:3000/timeline#week-1"`, { stdio: 'inherit' });
  console.log('Saved preview_timeline_mobile_modal.png');
} catch (e) {
  console.error(e.message);
}
