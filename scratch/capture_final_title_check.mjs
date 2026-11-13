import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

const port = 9238;
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

    let errors = [];
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

      send('Log.enable');
      send('Runtime.enable');
      ws.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.exceptionThrown') {
          errors.push(msg.params.exceptionDetails);
        }
      });

      setTimeout(async () => {
        // 1. Capture at top
        const shot0 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(previewsDir, 'arch_final_title_top.png'), Buffer.from(shot0.data, 'base64'));
        console.log('Saved arch_final_title_top.png');

        // 2. Scroll to 50%
        await send('Runtime.evaluate', {
          expression: `window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'instant' });`
        });

        setTimeout(async () => {
          const shot50 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(path.join(previewsDir, 'arch_final_title_scrolled.png'), Buffer.from(shot50.data, 'base64'));
          console.log('Saved arch_final_title_scrolled.png');

          console.log('Errors count:', errors.length);
          if (errors.length) console.log(JSON.stringify(errors, null, 2));

          ws.close();
          chrome.kill();
          process.exit(0);
        }, 800);
      }, 1500);
    };
  } catch(e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
