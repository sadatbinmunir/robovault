import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

const targets = [
  { url: 'http://localhost:3000', file: 'preview_cards_homepage.png' },
  { url: 'http://localhost:3000/overview', file: 'preview_cards_overview.png' },
  { url: 'http://localhost:3000/roadmap', file: 'preview_cards_roadmap.png' },
  { url: 'http://localhost:3000/timeline', file: 'preview_cards_timeline.png' },
  { url: 'http://localhost:3000/architecture', file: 'preview_cards_arch.png' },
];

for (const target of targets) {
  const outPath = path.join(previewsDir, target.file);
  try {
    execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,900 --screenshot="${outPath}" "${target.url}"`, {
      stdio: 'inherit',
      timeout: 15000,
    });
    console.log(`Saved ${target.file}`);
  } catch (err) {
    console.error(`Failed ${target.url}:`, err.message);
  }
}
