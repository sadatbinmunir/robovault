import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

const targets = [
  { url: 'http://localhost:3000', file: 'preview_borderless_home.png' },
  { url: 'http://localhost:3000/overview', file: 'preview_borderless_overview.png' },
  { url: 'http://localhost:3000/team', file: 'preview_borderless_team.png' },
];

for (const target of targets) {
  const outPath = path.join(previewsDir, target.file);
  console.log(`Capturing ${target.url} -> ${outPath}`);
  try {
    execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,900 --screenshot="${outPath}" "${target.url}"`, {
      stdio: 'inherit',
      timeout: 15000,
    });
    console.log(`Saved ${target.file}`);
  } catch (err) {
    console.error(`Failed to capture ${target.url}:`, err.message);
  }
}
