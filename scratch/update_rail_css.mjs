import fs from 'fs';

const filePath = 'public/css/styles.css';
let css = fs.readFileSync(filePath, 'utf8');

const railCss = `

/* ==========================================================================
   HORIZONTAL SIDE-SCROLLABLE PAGE SELECTORS RAIL
   (Exact match to user's reference picture with full side-scroll)
   ========================================================================== */
.header-scroll-rail-wrapper {
  pointer-events: auto;
  flex: 1;
  max-width: 780px;
  margin: 0 1rem;
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
}

.quick-nav-scroll-container {
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.5rem;
  border-radius: 9999px;
  background: rgba(8, 11, 18, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  scrollbar-width: none;
  -ms-overflow-style: none;
  mask-image: linear-gradient(to right, transparent 0%, black 18px, black calc(100% - 18px), transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 18px, black calc(100% - 18px), transparent 100%);
}

.quick-nav-scroll-container::-webkit-scrollbar {
  display: none;
}

.nav-rail-item {
  padding: 0.32rem 0.85rem;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 500;
  color: #9CA3AF;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.22s ease;
  border: 1px solid transparent;
}

.nav-rail-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-rail-item.active {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(99, 102, 241, 0.24) 100%);
  color: #ffffff;
  border: 1px solid rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 14px rgba(168, 85, 247, 0.35);
}

.rail-scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 18, 28, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease;
  opacity: 0.85;
}

.rail-scroll-arrow:hover {
  opacity: 1;
  background: rgba(28, 32, 50, 0.98);
  border-color: rgba(168, 85, 247, 0.6);
  transform: translateY(-50%) scale(1.1);
}

.rail-arrow-left {
  left: -8px;
}

.rail-arrow-right {
  right: -8px;
}
`;

css += railCss;
fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully appended rail CSS to styles.css!');
