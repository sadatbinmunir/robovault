import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outFile = path.resolve('previews', 'timeline_header_project_color.png');
execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,750 --screenshot="${outFile}" http://localhost:3000/timeline`, { stdio: 'inherit' });
console.log('Saved', outFile);
