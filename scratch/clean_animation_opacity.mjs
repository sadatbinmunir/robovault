import fs from 'fs';

const filePath = 'public/css/styles.css';
let css = fs.readFileSync(filePath, 'utf8');

css = css.replace(
  /@keyframes homeCardFadeUp\s*\{[\s\S]*?\}/,
  `@keyframes homeCardFadeUp {
  0% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(0);
  }
}`
);

// Remove animation-delay that could cause initial dimming
css = css.replace(/\/\* Staggered Grid Item Delays \*\/[\s\S]*?\.hud-grid-2 > :nth-child\(4\)[^\n]*\n/, '');

fs.writeFileSync(filePath, css, 'utf8');
console.log('Cleaned animation keyframes to maintain 100% crisp opacity at all times.');
