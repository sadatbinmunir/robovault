import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outFile = path.resolve('previews', 'arch_header_two_tone.png');
execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,550 --screenshot="${outFile}" http://localhost:3000/architecture`, { stdio: 'inherit' });
console.log('Saved', outFile);
