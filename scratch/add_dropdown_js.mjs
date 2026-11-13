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
});`;

if (js.includes(target)) {
  js = js.replace(target, replacement);
}

const dropdownCode = `

/* ==========================================================================
   10. PAGES DROPDOWN CONTROLLER (MATCHING HOME NAVBAR INTERACTIVITY)
   ========================================================================== */
function initPagesDropdown() {
  const btn = document.getElementById('pagesDropdownBtn');
  const menu = document.getElementById('pagesDropdownMenu');
  const closeBtn = document.getElementById('pagesDropdownCloseBtn');
  if (!btn || !menu) return;

  function toggleMenu(show) {
    const isOpen = show !== undefined ? show : !menu.classList.contains('open');
    if (isOpen) {
      menu.classList.add('open');
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      menu.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(false);
    });
  }

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleMenu(false);
    }
  });
}
`;

js += dropdownCode;
fs.writeFileSync(filePath, js, 'utf8');
console.log('Successfully updated main.js with initPagesDropdown!');
