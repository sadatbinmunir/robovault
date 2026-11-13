import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

const port = 9233;
const chrome = spawn(chromePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,900',
  'http://localhost:3000/architecture'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json`);
    const pages = await listRes.json();
    const ws = new WebSocket(pages[0].webSocketDebuggerUrl);

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
        // Select TFT Display and scroll to table
        await send('Runtime.evaluate', {
          expression: `
            selectArchComponent('tft_display');
            const tbl = document.getElementById('system-pinouts');
            if (tbl) tbl.scrollIntoView({ behavior: 'instant', block: 'center' });
          `
        });

        setTimeout(async () => {
          const shot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(path.join(previewsDir, 'arch_table_highlight.png'), Buffer.from(shot.data, 'base64'));
          console.log('Saved arch_table_highlight.png');

          ws.close();
          chrome.kill();
          process.exit(0);
        }, 500);
      }, 1000);
    };
  } catch(e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1200);
