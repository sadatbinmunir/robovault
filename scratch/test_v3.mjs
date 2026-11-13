import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');
const file = 'public/timeline.html';

// Version 3: Smooth gradient from pure white into vibrant electric violet
const whiteToPurpleGradient = `<h1 class="section-title" style="font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: -0.02em; background: linear-gradient(135deg, #FFFFFF 25%, #E9D5FF 55%, #C084FC 80%, #A855F7 100%) !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; filter: drop-shadow(0 0 24px rgba(168, 85, 247, 0.35));">PROJECT TIMELINE</h1>`;

let content = fs.readFileSync(file, 'utf8');
content = content.replace(/<h1 class="section-title"[\s\S]*?<\/h1>/, whiteToPurpleGradient);
fs.writeFileSync(file, content, 'utf8');

execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,600 --screenshot="${path.join(previewsDir, 'test_timeline_white_to_purple.png')}" http://localhost:3000/timeline`, { stdio: 'inherit' });
console.log('Saved test_timeline_white_to_purple.png');
