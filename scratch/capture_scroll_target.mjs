import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9224;

const chrome = spawn(chromePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,900',
  'http://localhost:3000/'
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
        // Scroll to 3D Project Visuals
        await send('Runtime.evaluate', {
          expression: `
            const heading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('3D Project Visuals'));
            if (heading) {
              heading.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
          `
        });

        setTimeout(async () => {
          const screenshot = await send('Page.captureScreenshot', { format: 'png' });
          if (screenshot && screenshot.data) {
            const buffer = Buffer.from(screenshot.data, 'base64');
            const outPath = path.resolve('previews/preview_studio_heading.png');
            fs.writeFileSync(outPath, buffer);
            console.log('Successfully captured studio heading to previews/preview_studio_heading.png!');
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
