import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9238;
const chrome = spawn(chromePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
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

      const evalRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const brokenImgs = Array.from(document.querySelectorAll('img')).filter(i => i.complete && i.naturalWidth === 0).map(i => i.src);
            const videos = Array.from(document.querySelectorAll('video')).map(v => ({ id: v.id, src: v.src, error: v.error ? v.error.message : null }));
            const header = document.querySelector('header');
            const footer = document.querySelector('footer');
            return {
              brokenImgs,
              videoCount: videos.length,
              headerOk: !!header,
              footerOk: !!footer,
              footerCols: footer ? footer.querySelectorAll('.footer-col-nav').length : 0
            };
          })()
        `,
        returnByValue: true
      });
      console.log(JSON.stringify(evalRes.result.value, null, 2));
      ws.close();
      chrome.kill();
    };
  } catch (e) {
    console.error(e);
    chrome.kill();
  }
}, 1500);
