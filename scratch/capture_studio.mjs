import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve('previews/preview_studio_no_pill.png');

try {
  execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outPath}" http://localhost:3000/`, { stdio: 'inherit' });
  console.log('Saved preview_studio_no_pill.png');
} catch (e) {
  console.error(e.message);
}
