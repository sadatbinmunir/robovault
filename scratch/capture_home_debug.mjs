import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9232;

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
        const shot1 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('previews/debug_home_hero.png', Buffer.from(shot1.data, 'base64'));
        console.log('Saved debug_home_hero.png');

        await send('Runtime.evaluate', {
          expression: `
            const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('3D Project Visuals'));
            if (h2) h2.scrollIntoView({ behavior: 'instant', block: 'start' });
          `
        });

        setTimeout(async () => {
          const shot2 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('previews/debug_home_3d.png', Buffer.from(shot2.data, 'base64'));
          console.log('Saved debug_home_3d.png');

          await send('Runtime.evaluate', {
            expression: `
              const bento = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('FocusBot AI Features') || h.textContent.includes('Features'));
              if (bento) bento.scrollIntoView({ behavior: 'instant', block: 'start' });
            `
          });

          setTimeout(async () => {
            const shot3 = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync('previews/debug_home_bento.png', Buffer.from(shot3.data, 'base64'));
            console.log('Saved debug_home_bento.png');
            ws.close();
            chrome.kill();
          }, 800);
        }, 800);
      }, 1500);
    };
  } catch (err) {
    console.error('Error during CDP capture:', err.message);
    chrome.kill();
  }
}, 1500);
