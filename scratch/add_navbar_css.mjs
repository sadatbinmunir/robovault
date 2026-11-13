import fs from 'fs';

const filePath = 'public/css/styles.css';
let css = fs.readFileSync(filePath, 'utf8');

const navCss = `

/* ==========================================================================
   FLOATING HOME-STYLE EDITORIAL NAVBAR (1:1 MATCH TO HOME PAGE)
   ========================================================================== */
.home-style-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.25rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  background: transparent !important;
  border-bottom: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

@media (max-width: 640px) {
  .home-style-header {
    padding: 1rem 1.25rem;
  }
}

.header-logo-wrapper {
  pointer-events: auto;
}

.focusbot-brand-link {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-decoration: none;
  color: #ffffff;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.85));
  transition: transform 0.2s ease, opacity 0.2s ease;
  user-select: none;
}

.focusbot-brand-link:hover {
  transform: scale(0.98);
  opacity: 0.95;
}

.brand-text-white {
  color: #ffffff;
  font-weight: 700;
}

.brand-text-gradient {
  background: linear-gradient(to right, #C084FC, #A855F7, #E9D5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

/* Center Minimalist Circle Button */
.header-center-wrapper {
  pointer-events: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.center-focus-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #9CA3AF;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.center-focus-btn:hover {
  background: rgba(24, 24, 27, 0.95);
  border-color: rgba(168, 85, 247, 0.5);
  color: #ffffff;
  transform: scale(1.08);
}

.center-focus-btn:hover .center-x-icon {
  transform: rotate(90deg);
}

.center-x-icon {
  transition: transform 0.3s ease;
}

/* Right Nav Controls */
.header-nav-wrapper {
  pointer-events: auto;
  position: relative;
}

.nav-controls-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.quick-nav-capsule {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.35rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}

@media (max-width: 1024px) {
  .quick-nav-capsule {
    display: none;
  }
}

.quick-nav-chip {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  color: #D1D5DB;
  text-decoration: none;
  transition: all 0.2s ease;
}

.quick-nav-chip:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}

/* Pages Trigger Button */
.pages-trigger-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 0.95rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.pages-trigger-btn:hover {
  background: rgba(24, 24, 27, 0.95);
  border-color: rgba(168, 85, 247, 0.5);
  transform: translateY(-1px);
}

.pages-trigger-btn.active {
  background: linear-gradient(135deg, rgba(88, 28, 135, 0.9) 0%, rgba(109, 40, 217, 0.9) 100%);
  border-color: rgba(192, 132, 252, 0.6);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
}

.pages-pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C084FC, #818CF8);
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
  animation: pulse-dot 2s infinite;
}

.pages-btn-text {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.pages-chevron-icon {
  color: #9CA3AF;
  transition: transform 0.3s ease;
}

.pages-trigger-btn.active .pages-chevron-icon {
  transform: rotate(180deg);
  color: #E9D5FF;
}

/* Dropdown Menu Modal */
.pages-dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.65rem);
  width: 360px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(15, 18, 28, 0.97) 0%, rgba(10, 13, 20, 0.97) 60%, rgba(7, 9, 14, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  padding: 1rem;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(168, 85, 247, 0.12);
  z-index: 1050;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px) scale(0.98);
  transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.22s;
  pointer-events: none;
}

.pages-dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.dropdown-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dropdown-section-title {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #C084FC;
  font-weight: 700;
}

.dropdown-dept-title {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: #9CA3AF;
}

.dropdown-links-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  max-height: 65vh;
  overflow-y: auto;
  padding-right: 0.2rem;
}

.dropdown-page-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.65rem;
  border-radius: 14px;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.dropdown-page-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.08);
  transform: translateX(3px);
}

.dropdown-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.dropdown-page-item:hover .dropdown-icon-box {
  transform: scale(1.08);
}

.dropdown-item-details {
  flex: 1;
  min-width: 0;
}

.dropdown-item-headline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-item-title {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  transition: color 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-page-item:hover .dropdown-item-title {
  color: #E9D5FF;
}

.dropdown-item-tag {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #9CA3AF;
}

.dropdown-item-desc {
  font-family: var(--font-sans);
  font-size: 0.68rem;
  color: #9CA3AF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.15rem;
  font-weight: 300;
}

.dropdown-footer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  margin-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.dropdown-home-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.74rem;
  font-weight: 500;
  color: #C084FC;
  text-decoration: none;
  transition: color 0.2s ease;
}

.dropdown-home-link:hover {
  color: #ffffff;
}

.dropdown-esc-btn {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: #9CA3AF;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.15rem 0.45rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-esc-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}
`;

css += navCss;
fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully appended home-style navbar CSS to styles.css!');
