import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve('previews/test_delayed_overview.png');

try {
  execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outPath}" http://localhost:3000/overview`, { stdio: 'inherit' });
  console.log('Saved test_delayed_overview.png');
} catch (e) {
  console.error(e.message);
}
