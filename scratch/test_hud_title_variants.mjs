import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

// Let's test Variant 1: Pure floating typography: FocusBot Companion Architecture
// FocusBot in white, Companion Architecture in theme purple gradient
const file = 'public/architecture.html';
let content = fs.readFileSync(file, 'utf8');

// Replace the story card with just FocusBot Companion Architecture
const variant1Card = `
          <div class="arch-hud-title-wrap" style="max-width: 680px; padding: 0.5rem 0;">
            <h1 style="font-family: var(--font-sans); font-size: clamp(2rem, 3.4vw, 2.85rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; margin: 0; filter: drop-shadow(0 4px 20px rgba(0,0,0,0.8));">
              <span style="color: #FFFFFF;">FocusBot</span> <span style="background: linear-gradient(135deg, #C084FC 0%, #A855F7 55%, #E9D5FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 24px rgba(168, 85, 247, 0.5));">Companion Architecture</span>
            </h1>
          </div>
`;

// Also update the JS so updateArchHud does NOT overwrite the title or remove it!
content = content.replace(/<div class="arch-hud-story-card"[\s\S]*?<\/div>\s*<\/div>/, variant1Card + '\n          </div>');

// In JS, remove the text overwriting in updateArchHud
content = content.replace(/archHudTitle\.textContent = [^;]+;/g, '// title kept permanent');
content = content.replace(/archHudDesc\.textContent = [^;]+;/g, '// desc removed');
content = content.replace(/archPhaseTagText\.textContent = [^;]+;/g, '// phase tag removed');

fs.writeFileSync(file, content, 'utf8');

execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${path.join(previewsDir, 'test_arch_hud_clean.png')}" http://localhost:3000/architecture`, { stdio: 'inherit' });
console.log('Saved test_arch_hud_clean.png');
