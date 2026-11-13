import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

const deckScrollOut = path.join(previewsDir, 'timeline_deck_scrolled.png');
// 1440x1600 or scroll down
execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,1600 --screenshot="${deckScrollOut}" http://localhost:3000/timeline`, { stdio: 'inherit' });
console.log('Saved timeline_deck_scrolled.png');
