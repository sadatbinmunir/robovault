import fs from 'fs';

const filePath = 'public/js/main.js';
let js = fs.readFileSync(filePath, 'utf8');

// Add initializers to DOMContentLoaded
const domLoadedTarget = `document.addEventListener('DOMContentLoaded', () => {
  initScrollHeader();
  initNavigation();
  initTimelineFilter();
  initVideoAudioExclusion();
  initTacticalLightbox();
  initComingSoonModals();
  initContactForm();
});`;

const newDomLoaded = `document.addEventListener('DOMContentLoaded', () => {
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

js = js.replace(domLoadedTarget, newDomLoaded);

// Append the functions at the end
const newFunctions = `

/* ==========================================================================
   8. COSMIC MOUSE SPOTLIGHT & CARD SHEEN CONTROLLER
   Synchronized with 3D Studio Home Page Design System
   ========================================================================== */
function initCosmicSpotlight() {
  // Global background cursor spotlight
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty('--mouse-x', \`\${x}px\`);
    document.documentElement.style.setProperty('--mouse-y', \`\${y}px\`);
  }, { passive: true });

  // Individual card sheen tracking
  const cardSelectors = [
    '.hud-card',
    '.faculty-supervisor-card',
    '.member-hud-card',
    '.leader-hud-card',
    '.member-vertical-hud-card',
    '.timeline-post-card',
    '.picture-card',
    '.coming-soon-card',
    '.arch-layer-card'
  ];

  const cards = document.querySelectorAll(cardSelectors.join(', '));
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cardX = e.clientX - rect.left;
      const cardY = e.clientY - rect.top;
      card.style.setProperty('--card-mouse-x', \`\${cardX}px\`);
      card.style.setProperty('--card-mouse-y', \`\${cardY}px\`);
    }, { passive: true });
  });
}

/* ==========================================================================
   9. SCROLL REVEAL ANIMATION CONTROLLER
   Smooth staggered entry for cards and modules
   ========================================================================== */
function initScrollReveal() {
  const elementsToReveal = document.querySelectorAll(
    '.hud-card, .faculty-supervisor-card, .member-hud-card, .leader-hud-card, .member-vertical-hud-card, .timeline-post-card, .picture-card'
  );

  elementsToReveal.forEach((el, index) => {
    el.classList.add('scroll-reveal');
    // Stagger initial items in viewport
    el.style.transitionDelay = \`\${(index % 4) * 0.08}s\`;
  });

  if (!('IntersectionObserver' in window)) {
    elementsToReveal.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  elementsToReveal.forEach(el => observer.observe(el));
}
`;

js += newFunctions;
fs.writeFileSync(filePath, js, 'utf8');
console.log('Successfully updated main.js with cosmic spotlight and scroll reveal!');
