import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

// Version 1: Two-tone brand style: PROJECT in white, TIMELINE in electric purple gradient
const file = 'public/timeline.html';
let content = fs.readFileSync(file, 'utf8');

// Replace PROJECT TIMELINE with two-tone
const twoTone = `<h1 class="section-title" style="font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: -0.02em;">PROJECT <span style="background: linear-gradient(135deg, #C084FC 0%, #A855F7 55%, #E9D5FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.4));">TIMELINE</span></h1>`;

content = content.replace(/<h1 class="section-title"[^>]*>PROJECT TIMELINE<\/h1>/, twoTone);
fs.writeFileSync(file, content, 'utf8');

execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,600 --screenshot="${path.join(previewsDir, 'test_timeline_twotone.png')}" http://localhost:3000/timeline`, { stdio: 'inherit' });
console.log('Saved test_timeline_twotone.png');

// Version 2: Full gradient on both words: PROJECT TIMELINE
const fullGradient = `<h1 class="section-title" style="font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: -0.02em; background: linear-gradient(135deg, #C084FC 0%, #A855F7 50%, #E9D5FF 100%) !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.35));">PROJECT TIMELINE</h1>`;

content = fs.readFileSync(file, 'utf8');
content = content.replace(twoTone, fullGradient);
fs.writeFileSync(file, content, 'utf8');

execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,600 --screenshot="${path.join(previewsDir, 'test_timeline_fullgradient.png')}" http://localhost:3000/timeline`, { stdio: 'inherit' });
console.log('Saved test_timeline_fullgradient.png');
