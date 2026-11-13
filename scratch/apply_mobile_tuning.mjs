/* Add responsive rules to timeline-liquid.css and re-bundle */
import fs from 'fs';

let css = fs.readFileSync('public/css/timeline-liquid.css', 'utf8');

const responsiveBlock = `
/* ==========================================================================
   MOBILE & TABLET RESPONSIVENESS (<= 640px)
   ========================================================================== */
@media (max-width: 640px) {
  .timeline-liquid-card {
    padding: 1.6rem 1.4rem 1.4rem 1.4rem;
    border-radius: 24px;
  }
  .card-question-headline {
    font-size: 1.22rem;
    line-height: 1.35;
  }
  .glass-orb-3d {
    width: 44px;
    height: 44px;
  }
  .orb-label-text {
    font-size: 0.68rem;
  }
  .card-bottom-bar {
    padding: 0.65rem 0.95rem;
    border-radius: 16px;
  }
  .card-action-prompt {
    font-size: 0.8rem;
  }
  .card-action-circle-btn {
    width: 32px;
    height: 32px;
  }

  /* Modal Mobile Tuning */
  .timeline-modal-overlay {
    padding: 0.6rem;
  }
  .timeline-modal-window {
    border-radius: 24px;
    max-height: 94vh;
  }
  .modal-sticky-header {
    padding: 1.15rem 1.25rem 0.9rem 1.25rem;
    gap: 1rem;
  }
  .modal-title {
    font-size: 1.1rem;
  }
  .modal-tabs-rail {
    padding: 0.5rem 1.25rem;
  }
  .modal-tab-btn {
    font-size: 0.74rem;
    padding: 0.35rem 0.75rem;
  }
  .modal-scrollable-body {
    padding: 1.25rem;
    gap: 1.25rem;
  }
  .modal-report-box {
    padding: 1.25rem;
    border-radius: 16px;
  }
  .modal-sticky-footer {
    padding: 0.9rem 1.25rem;
  }
  .modal-nav-btn {
    padding: 0.45rem 0.85rem;
    font-size: 0.75rem;
  }
  .modal-week-indicator {
    font-size: 0.7rem;
  }
}
`;

css += responsiveBlock;
fs.writeFileSync('public/css/timeline-liquid.css', css, 'utf8');

// Re-bundle into public/timeline.html
const js = fs.readFileSync('public/js/timeline-experience.js', 'utf8');
let html = fs.readFileSync('public/timeline.html', 'utf8');

// Update style tag
const styleStart = html.indexOf('<style id="timelineLiquidStyles">');
const styleEnd = html.indexOf('</style>', styleStart);
if (styleStart !== -1 && styleEnd !== -1) {
  html = html.slice(0, styleStart) + `<style id="timelineLiquidStyles">\n${css}\n</style>` + html.slice(styleEnd + 8);
}

// Update script tag
const scriptStart = html.indexOf('<script id="timelineExperienceScript">');
const scriptEnd = html.indexOf('</script>', scriptStart);
if (scriptStart !== -1 && scriptEnd !== -1) {
  html = html.slice(0, scriptStart) + `<script id="timelineExperienceScript">\n${js}\n</script>` + html.slice(scriptEnd + 9);
}

fs.writeFileSync('public/timeline.html', html, 'utf8');
console.log('Mobile optimizations applied and re-bundled successfully!');
