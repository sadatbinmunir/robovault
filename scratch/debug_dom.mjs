import { execSync } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const html = execSync(`"${chromePath}" --headless --disable-gpu --dump-dom http://localhost:3000/overview`, { encoding: 'utf8' });
console.log('DOM contains PROJECT OVERVIEW:', html.includes('PROJECT OVERVIEW'));
console.log('DOM contains hud-card:', html.includes('hud-card'));
console.log('Length of dumped HTML:', html.length);
