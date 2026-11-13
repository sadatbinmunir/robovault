import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9236;
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
            const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
            const styles = Array.from(document.querySelectorAll('style')).map(s => s.innerHTML.slice(0, 80));
            const header = document.querySelector('header');
            const rules = [];
            for (const sheet of document.styleSheets) {
              try {
                for (const rule of sheet.cssRules) {
                  if (rule.selectorText && (rule.selectorText.includes('fixed') || rule.selectorText.includes('header'))) {
                    rules.push({ selector: rule.selectorText, css: rule.cssText });
                  }
                }
              } catch (e) {}
            }
            return {
              links,
              stylesCount: styles.length,
              rulesCount: rules.length,
              sampleRules: rules.slice(0, 10),
              headerPosition: header ? getComputedStyle(header).position : null
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
