import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');
if (!fs.existsSync(previewsDir)) fs.mkdirSync(previewsDir, { recursive: true });

const port = 9232;
const chrome = spawn(chromePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,1100',
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
        // Scroll to explorer
        await send('Runtime.evaluate', {
          expression: `
            const el = document.getElementById('equipments');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          `
        });

        setTimeout(async () => {
          const shot1 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(path.join(previewsDir, 'arch_explorer_overview.png'), Buffer.from(shot1.data, 'base64'));
          console.log('Saved arch_explorer_overview.png');

          // Select TFT Display
          await send('Runtime.evaluate', {
            expression: `
              if (typeof selectArchComponent === 'function') {
                selectArchComponent('tft_display');
              }
            `
          });

          setTimeout(async () => {
            const shot2 = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(path.join(previewsDir, 'arch_explorer_tft_selected.png'), Buffer.from(shot2.data, 'base64'));
            console.log('Saved arch_explorer_tft_selected.png');

            // Select MAX98357A Audio Amp
            await send('Runtime.evaluate', {
              expression: `
                if (typeof selectArchComponent === 'function') {
                  selectArchComponent('max98357a_audio');
                }
              `
            });

            setTimeout(async () => {
              const shot3 = await send('Page.captureScreenshot', { format: 'png' });
              fs.writeFileSync(path.join(previewsDir, 'arch_explorer_audio_selected.png'), Buffer.from(shot3.data, 'base64'));
              console.log('Saved arch_explorer_audio_selected.png');

              console.log('Console errors:', errors.length);
              ws.close();
              chrome.kill();
              process.exit(0);
            }, 500);
          }, 500);
        }, 500);
      }, 1000);
    };
  } catch(e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1200);
