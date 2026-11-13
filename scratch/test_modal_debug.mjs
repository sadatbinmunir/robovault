import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9228;
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
        if (msg.method === 'Runtime.consoleAPICalled' || msg.method === 'Runtime.exceptionThrown') {
          console.log('BROWSER LOG:', JSON.stringify(msg.params));
        }
      });

      setTimeout(async () => {
        const evalRes = await send('Runtime.evaluate', {
          expression: `
            (() => {
              const cards = document.querySelectorAll('.timeline-deck-card');
              const modal = document.getElementById('telemetryModal');
              const fn = typeof window.openSprintModal;
              return { cardCount: cards.length, hasModal: !!modal, openFnType: fn };
            })()
          `,
          returnByValue: true
        });
        console.log('DOM check:', evalRes.result.value);

        const openRes = await send('Runtime.evaluate', {
          expression: `
            (() => {
              if (window.openSprintModal) {
                window.openSprintModal(5);
                const modal = document.getElementById('telemetryModal');
                return { 
                  modalActive: modal ? modal.classList.contains('active') : false, 
                  modalDisplay: modal ? window.getComputedStyle(modal).display : 'none',
                  modalOpacity: modal ? window.getComputedStyle(modal).opacity : 'none',
                  modalVisibility: modal ? window.getComputedStyle(modal).visibility : 'none',
                  modalZIndex: modal ? window.getComputedStyle(modal).zIndex : 'none'
                };
              }
              return { error: 'no openSprintModal' };
            })()
          `,
          returnByValue: true
        });
        console.log('Open result:', openRes.result.value);

        ws.close();
        chrome.kill();
        process.exit(0);
      }, 1000);
    };
  } catch(e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1200);
