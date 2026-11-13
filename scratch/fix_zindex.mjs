import fs from 'fs';

const filePath = 'public/css/styles.css';
let css = fs.readFileSync(filePath, 'utf8');

// Ensure frosted-glass-bg is ALWAYS behind content (z-index: 0)
// and main is ALWAYS above it (z-index: 2)
// and site-header is on top (z-index: 100)

css = css.replace(
  /\.frosted-glass-bg\s*\{[^}]*\}/g,
  `.frosted-glass-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0 !important;
  overflow: hidden;
  background: 
    radial-gradient(circle 850px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(168, 85, 247, 0.12), transparent 60%),
    radial-gradient(circle 800px at 10% 20%, rgba(139, 92, 246, 0.18) 0%, transparent 65%),
    radial-gradient(circle 850px at 90% 70%, rgba(59, 130, 246, 0.14) 0%, transparent 65%),
    radial-gradient(circle 950px at 50% 50%, rgba(88, 28, 135, 0.20) 0%, transparent 70%),
    radial-gradient(circle 600px at 70% 15%, rgba(255, 94, 14, 0.05) 0%, transparent 60%),
    #000000;
  animation: cosmicBreathing 18s ease-in-out infinite alternate;
}`
);

// Ensure main and site-header z-indexes
if (!css.includes('main { position: relative !important; z-index: 2 !important; }')) {
  css += `\n\nmain { position: relative !important; z-index: 2 !important; }\n.site-header { z-index: 100 !important; }\n`;
}

// Ensure cards are always visible immediately (opacity: 1), with subtle smooth animation
css = css.replace(
  /@keyframes homeCardFadeUp\s*\{[\s\S]*?\}\s*\.hud-card,[\s\S]*?animation:\s*homeCardFadeUp[^\n;]*;/g,
  `@keyframes homeCardFadeUp {
  0% {
    opacity: 0.85;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.hud-card,
.member-hud-card,
.leader-hud-card,
.member-vertical-hud-card,
.timeline-post-card,
.picture-card,
.coming-soon-card,
.arch-layer-card,
.spec-card,
.matrix-card,
.tactical-table-wrapper {
  animation: homeCardFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) ease-out;`
);

fs.writeFileSync(filePath, css, 'utf8');
console.log('Fixed z-index and animations in styles.css');
