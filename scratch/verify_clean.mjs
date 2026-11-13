import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9231;
const chrome = spawn(chromePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  'http://localhost:3000/timeline'
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
        // Test filtering
        await send('Runtime.evaluate', { expression: "filterSprintCards('video')" });
        await send('Runtime.evaluate', { expression: "filterSprintCards('all')" });
        // Test modal open, next, prev, close
        await send('Runtime.evaluate', { expression: "openWeekModal(1); stepModalWeek(1); stepModalWeek(-1); closeWeekModal();" });

        setTimeout(() => {
          console.log('Console errors count:', errors.length);
          if (errors.length) console.log(JSON.stringify(errors, null, 2));
          ws.close();
          chrome.kill();
          process.exit(errors.length > 0 ? 1 : 0);
        }, 500);
      }, 1000);
    };
  } catch(e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1200);
