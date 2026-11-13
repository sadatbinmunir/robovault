import { execSync } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const script = `
const main = document.querySelector('main');
const rect = main ? main.getBoundingClientRect() : null;
const style = main ? window.getComputedStyle(main) : null;
console.log(JSON.stringify({
  mainFound: !!main,
  rect: rect,
  display: style ? style.display : null,
  visibility: style ? style.visibility : null,
  opacity: style ? style.opacity : null,
  zIndex: style ? style.zIndex : null,
  paddingTop: style ? style.paddingTop : null,
  position: style ? style.position : null,
  top: style ? style.top : null,
}));
`;

// Run node with chrome evaluation
// In chrome headless, we can run a quick puppeteer-like evaluation with fetch or standard CDP
