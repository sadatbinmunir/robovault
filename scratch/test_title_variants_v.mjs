import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');
const file = 'public/architecture.html';
let baseContent = fs.readFileSync(file, 'utf8');

const variants = [
  {
    name: 'v1_focusbot_white_comp_arch_purple',
    html: `
      <div class="arch-hud-title-wrap" style="max-width: 650px;">
        <h1 style="font-family: var(--font-sans); font-size: clamp(2.2rem, 3.8vw, 3.2rem); font-weight: 800; letter-spacing: -0.025em; line-height: 1.1; margin: 0; filter: drop-shadow(0 4px 24px rgba(0,0,0,0.85));">
          <span style="color: #FFFFFF;">FocusBot</span><br>
          <span style="background: linear-gradient(135deg, #C084FC 0%, #A855F7 55%, #E9D5FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 24px rgba(168, 85, 247, 0.45));">Companion Architecture</span>
        </h1>
      </div>
    `
  },
  {
    name: 'v2_focus_white_bot_purple_inline',
    html: `
      <div class="arch-hud-title-wrap" style="max-width: 700px;">
        <h1 style="font-family: var(--font-sans); font-size: clamp(2.2rem, 3.8vw, 3.2rem); font-weight: 800; letter-spacing: -0.025em; line-height: 1.1; margin: 0; filter: drop-shadow(0 4px 24px rgba(0,0,0,0.85));">
          <span style="color: #FFFFFF;">Focus</span><span style="background: linear-gradient(135deg, #C084FC 0%, #A855F7 55%, #E9D5FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.45));">Bot</span> <span style="background: linear-gradient(135deg, #C084FC 0%, #A855F7 55%, #E9D5FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.45));">Companion Architecture</span>
        </h1>
      </div>
    `
  },
  {
    name: 'v3_focusbot_comp_white_arch_purple',
    html: `
      <div class="arch-hud-title-wrap" style="max-width: 650px;">
        <h1 style="font-family: var(--font-sans); font-size: clamp(2.2rem, 3.8vw, 3.2rem); font-weight: 800; letter-spacing: -0.025em; line-height: 1.1; margin: 0; filter: drop-shadow(0 4px 24px rgba(0,0,0,0.85));">
          <span style="color: #FFFFFF;">FocusBot Companion</span><br>
          <span style="background: linear-gradient(135deg, #C084FC 0%, #A855F7 55%, #E9D5FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 24px rgba(168, 85, 247, 0.45));">Architecture</span>
        </h1>
      </div>
    `
  }
];

for (const v of variants) {
  let content = baseContent.replace(/<div class="arch-hud-title-wrap"[\s\S]*?<\/div>/, v.html.trim());
  fs.writeFileSync(file, content, 'utf8');
  const outPath = path.join(previewsDir, `${v.name}.png`);
  execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outPath}" http://localhost:3000/architecture`, { stdio: 'inherit' });
  console.log('Saved', v.name);
}
