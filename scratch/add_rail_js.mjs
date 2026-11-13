import fs from 'fs';

const filePath = 'public/js/main.js';
let js = fs.readFileSync(filePath, 'utf8');

const target = `document.addEventListener('DOMContentLoaded', () => {
  initScrollHeader();
  initNavigation();
  initTimelineFilter();
  initVideoAudioExclusion();
  initTacticalLightbox();
  initComingSoonModals();
  initContactForm();
  initCosmicSpotlight();
  initScrollReveal();
  initPagesDropdown();
});`;

const replacement = `document.addEventListener('DOMContentLoaded', () => {
  initScrollHeader();
  initNavigation();
  initTimelineFilter();
  initVideoAudioExclusion();
  initTacticalLightbox();
  initComingSoonModals();
  initContactForm();
  initCosmicSpotlight();
  initScrollReveal();
  initPagesDropdown();
  initRailScroll();
});`;

if (js.includes(target)) {
  js = js.replace(target, replacement);
}

const railCode = `

/* ==========================================================================
   11. HORIZONTAL SIDE-SCROLLABLE NAV RAIL CONTROLLER
   ========================================================================== */
function initRailScroll() {
  const container = document.getElementById('quickNavScrollContainer');
  const leftBtn = document.getElementById('railScrollLeftBtn');
  const rightBtn = document.getElementById('railScrollRightBtn');
  if (!container) return;

  function updateArrows() {
    if (!leftBtn || !rightBtn) return;
    const canLeft = container.scrollLeft > 6;
    const canRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 6;
    leftBtn.style.opacity = canLeft ? '1' : '0.25';
    leftBtn.style.pointerEvents = canLeft ? 'auto' : 'none';
    rightBtn.style.opacity = canRight ? '1' : '0.25';
    rightBtn.style.pointerEvents = canRight ? 'auto' : 'none';
  }

  container.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -220, behavior: 'smooth' });
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      container.scrollBy({ left: 220, behavior: 'smooth' });
    });
  }

  // Mouse wheel horizontal scroll support
  container.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      container.scrollLeft += e.deltaY * 0.9;
    }
  }, { passive: false });

  // Center active link initially
  const activeLink = container.querySelector('.nav-rail-item.active');
  if (activeLink) {
    setTimeout(() => {
      const offset = activeLink.offsetLeft - (container.clientWidth / 2) + (activeLink.clientWidth / 2);
      container.scrollTo({ left: offset, behavior: 'smooth' });
      updateArrows();
    }, 150);
  } else {
    updateArrows();
  }
}
`;

js += railCode;
fs.writeFileSync(filePath, js, 'utf8');
console.log('Successfully updated main.js with initRailScroll!');
