import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9234;
const chrome = spawn(chromePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  'http://localhost:3000/'
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
            const header = document.querySelector('header');
            const hero = document.querySelector('main');
            const canvas = document.querySelector('canvas');
            return {
              scrollY: window.scrollY,
              headerExists: !!header,
              headerStyle: header ? {
                display: getComputedStyle(header).display,
                visibility: getComputedStyle(header).visibility,
                opacity: getComputedStyle(header).opacity,
                zIndex: getComputedStyle(header).zIndex,
                position: getComputedStyle(header).position,
                top: getComputedStyle(header).top,
                rect: header.getBoundingClientRect()
              } : null,
              heroExists: !!hero,
              heroRect: hero ? hero.getBoundingClientRect() : null,
              canvasZIndex: canvas ? getComputedStyle(canvas).zIndex : null
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
