import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9240;
const chrome = spawn(chromePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,900',
  'http://localhost:3000/timeline'
]);

setTimeout(async () => {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json`);
    const pages = await res.json();
    const ws = new WebSocket(pages[0].webSocketDebuggerUrl);
    ws.onopen = async () => {
      let id = 1;
      const send = (method, params = {}) => new Promise(r => {
        const reqId = id++;
        const handler = (e) => {
          const m = JSON.parse(e.data);
          if (m.id === reqId) {
            ws.removeEventListener('message', handler);
            r(m.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });

      // Scroll down 400px
      await send('Runtime.evaluate', {
        expression: `
          window.scrollTo(0, 400);
        `
      });

      setTimeout(async () => {
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('previews/preview_timeline_scrolled_header.png', Buffer.from(shot.data, 'base64'));
        console.log('Saved preview_timeline_scrolled_header.png');
        ws.close();
        chrome.kill();
      }, 500);
    };
  } catch (e) {
    console.error(e);
    chrome.kill();
  }
}, 1500);
