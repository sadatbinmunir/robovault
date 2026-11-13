import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');
if (!fs.existsSync(previewsDir)) fs.mkdirSync(previewsDir, { recursive: true });

// 1. Static capture of stepper and top deck
const deckShot = path.join(previewsDir, 'timeline_stepper_and_deck.png');
execSync(`"${chromePath}" --headless --disable-gpu --virtual-time-budget=2000 --window-size=1440,1100 --screenshot="${deckShot}" http://localhost:3000/timeline`, { stdio: 'inherit' });
console.log('Saved timeline_stepper_and_deck.png');

// 2. Interactive capture with modal open
const port = 9229;
const chrome = spawn(chromePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,1050',
  'http://localhost:3000/timeline'
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
        // Open Week 5 modal
        await send('Runtime.evaluate', {
          expression: `
            if (typeof openWeekModal === 'function') {
              openWeekModal(5);
            }
          `
        });

        setTimeout(async () => {
          const shot1 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(path.join(previewsDir, 'timeline_modal_week5.png'), Buffer.from(shot1.data, 'base64'));
          console.log('Saved timeline_modal_week5.png');

          // Switch to video tab
          await send('Runtime.evaluate', {
            expression: `
              if (typeof switchModalTab === 'function') {
                switchModalTab('video');
              }
            `
          });

          setTimeout(async () => {
            const shot2 = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(path.join(previewsDir, 'timeline_modal_tab_video.png'), Buffer.from(shot2.data, 'base64'));
            console.log('Saved timeline_modal_tab_video.png');

            // Switch to gallery tab
            await send('Runtime.evaluate', {
              expression: `
                if (typeof switchModalTab === 'function') {
                  switchModalTab('gallery');
                }
              `
            });

            setTimeout(async () => {
              const shot3 = await send('Page.captureScreenshot', { format: 'png' });
              fs.writeFileSync(path.join(previewsDir, 'timeline_modal_tab_gallery.png'), Buffer.from(shot3.data, 'base64'));
              console.log('Saved timeline_modal_tab_gallery.png');

              ws.close();
              chrome.kill();
              process.exit(0);
            }, 600);
          }, 600);
        }, 600);
      }, 1000);
    };
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
