import { execSync, spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

// 1. Homepage Header (top)
const homeHeaderOut = path.join(previewsDir, 'preview_header_no_pages_btn.png');
execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,500 --screenshot="${homeHeaderOut}" http://localhost:3000/`, { stdio: 'inherit' });
console.log('Saved preview_header_no_pages_btn.png');

// 2. Subpage Header (top of /overview)
const subHeaderOut = path.join(previewsDir, 'preview_subpage_header.png');
execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,500 --screenshot="${subHeaderOut}" http://localhost:3000/overview`, { stdio: 'inherit' });
console.log('Saved preview_subpage_header.png');

// 3. Subpage Footer (/overview scrolled to bottom)
const port = 9225;
const chrome = spawn(chromePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,900',
  'http://localhost:3000/overview'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json`);
    const pages = await listRes.json();
    const wsUrl = pages[0].webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      let id = 1;
      function send(method, params = {}) {
        return new Promise((resolve) => {
          const reqId = id++;
          function onMsg(event) {
            const msg = JSON.parse(event.data);
            if (msg.id === reqId) {
              ws.removeEventListener('message', onMsg);
              resolve(msg.result);
            }
          }
          ws.addEventListener('message', onMsg);
          ws.send(JSON.stringify({ id: reqId, method, params }));
        });
      }

      setTimeout(async () => {
        // Scroll to footer
        await send('Runtime.evaluate', {
          expression: `
            const footer = document.querySelector('footer');
            if (footer) {
              footer.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
          `
        });

        setTimeout(async () => {
          const screenshot = await send('Page.captureScreenshot', { format: 'png' });
          if (screenshot && screenshot.data) {
            const buffer = Buffer.from(screenshot.data, 'base64');
            const outPath = path.resolve('previews/preview_subpage_footer.png');
            fs.writeFileSync(outPath, buffer);
            console.log('Saved preview_subpage_footer.png');
          }
          ws.close();
          chrome.kill();
        }, 600);
      }, 1500);
    };
  } catch (err) {
    console.error('Error during CDP capture:', err.message);
    chrome.kill();
  }
}, 1500);
