import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

const targets = [
  { url: 'http://localhost:3000', file: 'preview_combined_nav_home.png', size: '1440,900' },
  { url: 'http://localhost:3000/architecture', file: 'preview_combined_arch_schem.png', size: '1440,2200' },
  { url: 'http://localhost:3000/schematics', file: 'preview_combined_schematics_route.png', size: '1440,900' },
];

for (const target of targets) {
  const outPath = path.join(previewsDir, target.file);
  console.log(`Capturing ${target.url} -> ${outPath}`);
  try {
    execSync(`"${chromePath}" --headless --disable-gpu --window-size=${target.size} --screenshot="${outPath}" "${target.url}"`, {
      stdio: 'inherit',
      timeout: 20000,
    });
    console.log(`Saved ${target.file}`);
  } catch (err) {
    console.error(`Failed to capture ${target.url}:`, err.message);
  }
}
