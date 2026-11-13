import fs from 'fs';

let css = fs.readFileSync('public/css/styles.css', 'utf8');

const updatedFooterAndHeaderCss = `
/* ==========================================================================
   GLOBAL UNIFIED SITE FOOTER (HIGH-END OBSIDIAN & DELICATE PURPLE ACCENTS)
   ========================================================================== */
.site-footer {
  padding: 5rem 0 2.5rem !important;
  background: #040407 !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  position: relative !important;
  z-index: 10 !important;
  overflow: hidden !important;
}

.site-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 30%;
  width: 500px;
  height: 250px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%);
  pointer-events: none;
  filter: blur(60px);
}

.footer-top-grid {
  display: grid !important;
  grid-template-columns: 2fr 1fr 1fr 1.3fr !important;
  gap: 3.5rem !important;
  margin-bottom: 3.5rem !important;
}

@media (max-width: 1024px) {
  .footer-top-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 2.5rem !important;
  }
}

@media (max-width: 640px) {
  .footer-top-grid {
    grid-template-columns: 1fr !important;
    gap: 2.25rem !important;
  }
  .site-footer {
    padding: 3.5rem 0 2rem !important;
  }
}

.footer-brand-link {
  display: inline-flex !important;
  align-items: center !important;
  font-family: var(--font-sans) !important;
  font-size: 1.6rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
  text-decoration: none !important;
  color: #ffffff !important;
  margin-bottom: 0.85rem !important;
}

.footer-desc {
  font-size: 0.88rem !important;
  line-height: 1.65 !important;
  color: #A1A1AA !important;
  max-width: 420px !important;
  margin-bottom: 1.25rem !important;
  font-weight: 300 !important;
}

.footer-telemetry-badge {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  padding: 0.4rem 0.85rem !important;
  border-radius: 9999px !important;
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  font-family: var(--font-mono) !important;
  font-size: 0.7rem !important;
  color: #D4D4D8 !important;
}

.telemetry-pulse-dot {
  width: 6px !important;
  height: 6px !important;
  border-radius: 50% !important;
  background: #A855F7 !important;
  box-shadow: 0 0 8px #C084FC !important;
  flex-shrink: 0 !important;
}

.footer-col-heading {
  font-family: var(--font-mono) !important;
  font-size: 0.74rem !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  color: #C084FC !important;
  font-weight: 700 !important;
  margin-bottom: 1.2rem !important;
  display: block !important;
}

.footer-nav-list {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.75rem !important;
}

.footer-nav-list li a {
  color: #A1A1AA !important;
  text-decoration: none !important;
  font-size: 0.88rem !important;
  font-family: var(--font-sans) !important;
  transition: all 0.2s ease !important;
  display: inline-block !important;
}

.footer-nav-list li a:hover {
  color: #FFFFFF !important;
  transform: translateX(4px) !important;
}

.footer-contact-caption {
  font-size: 0.82rem !important;
  line-height: 1.55 !important;
  color: #A1A1AA !important;
  margin-bottom: 1rem !important;
  font-weight: 300 !important;
}

.footer-email-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.6rem !important;
  padding: 0.55rem 1rem !important;
  border-radius: 12px !important;
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.09) !important;
  color: #E4E4E7 !important;
  font-family: var(--font-mono) !important;
  font-size: 0.78rem !important;
  text-decoration: none !important;
  transition: all 0.25s ease !important;
}

.footer-email-pill svg {
  color: #A855F7 !important;
}

.footer-email-pill:hover {
  background: rgba(168, 85, 247, 0.15) !important;
  border-color: rgba(192, 132, 252, 0.45) !important;
  color: #FFFFFF !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 18px rgba(168, 85, 247, 0.25) !important;
}

.footer-privacy-tag {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  margin-top: 0.85rem !important;
  font-family: var(--font-mono) !important;
  font-size: 0.72rem !important;
  color: #71717A !important;
}

.footer-bottom-row {
  padding-top: 2rem !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  flex-wrap: wrap !important;
  gap: 1.25rem !important;
}

.footer-copy-text {
  color: #71717A !important;
  font-size: 0.8rem !important;
  margin: 0 !important;
  font-weight: 300 !important;
}

.footer-back-to-top {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  padding: 0.45rem 1.1rem !important;
  border-radius: 9999px !important;
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #A1A1AA !important;
  font-family: var(--font-mono) !important;
  font-size: 0.74rem !important;
  letter-spacing: 0.05em !important;
  text-decoration: none !important;
  transition: all 0.25s ease !important;
  cursor: pointer !important;
}

.footer-back-to-top:hover {
  background: rgba(168, 85, 247, 0.18) !important;
  border-color: rgba(192, 132, 252, 0.45) !important;
  color: #FFFFFF !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 18px rgba(168, 85, 247, 0.25) !important;
}

.footer-back-to-top svg {
  color: #C084FC !important;
  transition: transform 0.25s ease !important;
}

.footer-back-to-top:hover svg {
  transform: translateY(-2px) !important;
}

/* Header refinement when right buttons are removed */
.home-style-header {
  justify-content: space-between !important;
}

.header-scroll-rail-wrapper {
  margin-left: auto !important;
  max-width: 980px !important;
}
`;

css += '\n' + updatedFooterAndHeaderCss;
fs.writeFileSync('public/css/styles.css', css, 'utf8');
console.log('Appended updated site footer and header CSS to public/css/styles.css');
