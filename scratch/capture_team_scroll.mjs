import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

// Take a long screenshot or standard window
const outPath = path.join(previewsDir, 'preview_team_clean_all.png');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,2400 --screenshot="${outPath}" http://localhost:3000/team`, {
  stdio: 'inherit',
  timeout: 15000,
});
console.log('Captured full team page screenshot.');
