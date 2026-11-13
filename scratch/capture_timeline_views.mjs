import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

// 1. Capture Page View
const pageOut = path.join(previewsDir, 'preview_timeline_liquid_cards.png');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,1100 --screenshot="${pageOut}" http://localhost:3000/timeline`, {
  stdio: 'inherit',
  timeout: 15000
});
console.log('Saved preview_timeline_liquid_cards.png');

// 2. Capture with URL hash to trigger modal open (e.g. #week-1 or #week-5)
const modalOut = path.join(previewsDir, 'preview_timeline_modal_open.png');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,1100 --screenshot="${modalOut}" "http://localhost:3000/timeline#week-1"`, {
  stdio: 'inherit',
  timeout: 15000
});
console.log('Saved preview_timeline_modal_open.png');
