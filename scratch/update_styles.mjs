import fs from 'fs';

const filePath = 'public/css/styles.css';
let css = fs.readFileSync(filePath, 'utf8');

const marker = '/* Universal Typography & Utils */';
const idx = css.indexOf(marker);
if (idx === -1) {
  console.error('Marker not found!');
  process.exit(1);
}

const newTop = `/* ==========================================================================
   FOCUSBOT // COSMIC OBSIDIAN DESIGN SYSTEM (HARMONIZED WITH 3D STUDIO HOME)
   Theme: Deep Obsidian Space Black (#000000 / #030305)
   Accents: Electric Purple / Violet (#A855F7, #C084FC), Focus Orange (#FF5E0E), Zinc / White
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

:root {
  /* Color Palette - Deep Obsidian & Cosmic Halos */
  --bg-primary: #000000;
  --bg-secondary: #05070E;
  --bg-card: rgba(15, 18, 28, 0.72);
  --bg-card-hover: rgba(22, 27, 44, 0.88);
  --bg-overlay: rgba(4, 5, 8, 0.94);
  
  /* Primary Accent: Electric Violet & Glowing Purple (Matching Home Page) */
  --purple-primary: #A855F7;
  --purple-light: #C084FC;
  --purple-glow: rgba(168, 85, 247, 0.45);
  --purple-subtle: rgba(168, 85, 247, 0.12);
  --purple-border: rgba(168, 85, 247, 0.35);

  /* Cyan variables mapped to Violet/Purple so all existing rules turn purple */
  --cyan-primary: #C084FC;
  --cyan-glow: rgba(192, 132, 252, 0.5);
  --cyan-subtle: rgba(168, 85, 247, 0.15);
  --cyan-border: rgba(168, 85, 247, 0.35);

  --indigo-primary: #6366F1;
  --indigo-glow: rgba(99, 102, 241, 0.4);
  
  /* Warm Accent: Focus Orange (#FF5E0E) */
  --orange-primary: #FF5E0E;
  --orange-glow: rgba(255, 94, 14, 0.45);
  --orange-subtle: rgba(255, 94, 14, 0.12);
  --orange-border: rgba(255, 94, 14, 0.35);

  --text-primary: #FFFFFF;
  --text-muted: #9CA3AF;
  --text-dark: #6B7280;
  --border-dim: rgba(255, 255, 255, 0.08);

  /* Typography: Inter & JetBrains Mono */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Layout */
  --header-height: 76px;
  --telemetry-height: 52px;
  --container-max: 1380px;
  --corner-bracket-size: 10px;
  
  --transition-fast: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-normal: 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Base Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  color-scheme: dark;
  background-color: #000000;
}

body {
  background-color: #000000;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--orange-primary);
  color: #ffffff;
}

/* Cosmic Dot Matrix & Architectural Grid */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: 
    radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 32px 32px, 96px 96px, 96px 96px;
  pointer-events: none;
  z-index: 0;
}

/* Disable old CRT scanline overlay */
.scanline-overlay {
  display: none !important;
}

/* ==========================================================================
   FROSTED GLASS BACKGROUND ATMOSPHERE (COSMIC GLOW HALOS & SPOTLIGHT)
   Recreates the atmospheric glowing orbs from the Home Page Bento Grid
   ========================================================================== */
.frosted-glass-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  background: 
    radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(168, 85, 247, 0.10), transparent 60%),
    radial-gradient(circle 750px at 15% 15%, rgba(147, 51, 234, 0.15) 0%, transparent 70%),
    radial-gradient(circle 850px at 85% 55%, rgba(99, 102, 241, 0.12) 0%, transparent 70%),
    radial-gradient(circle 950px at 50% 90%, rgba(88, 28, 135, 0.18) 0%, transparent 70%),
    radial-gradient(circle 600px at 70% 20%, rgba(255, 94, 14, 0.04) 0%, transparent 65%),
    #000000;
  animation: cosmicBreathing 16s ease-in-out infinite alternate;
}

@keyframes cosmicBreathing {
  0% {
    filter: brightness(1) saturate(1);
    transform: scale(1);
  }
  50% {
    filter: brightness(1.22) saturate(1.28);
    transform: scale(1.02);
  }
  100% {
    filter: brightness(1.05) saturate(1.12);
    transform: scale(1);
  }
}

/* ==========================================================================
   SUBTLE CIRCUIT BOARD BACKGROUND (Hardware-grounded PCB traces)
   Rendered in luminous purple glow
   ========================================================================== */
.circuit-bg-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 2;
  opacity: 0.18;
  overflow: hidden;
  filter: hue-rotate(85deg) brightness(1.25) drop-shadow(0 0 12px rgba(168, 85, 247, 0.35));
  transition: opacity var(--transition-normal);
}

.circuit-pcb-svg {
  width: 100%;
  height: 100%;
  display: block;
}

`;

// Strip any existing override block if previously added
const overrideMarker = '/* ==========================================================================\n   FOCUSBOT // COMPREHENSIVE OBSIDIAN GLASS & ANIMATION SYSTEM';
const existingIdx = css.indexOf(overrideMarker);
const baseCss = existingIdx !== -1 ? css.substring(idx, existingIdx) : css.substring(idx);

const designSystemOverrides = `

/* ==========================================================================
   FOCUSBOT // COMPREHENSIVE OBSIDIAN GLASS & ANIMATION SYSTEM
   Extracted from Home Page (Hero, Bento Grid, 3D Studio, Marquee)
   ========================================================================== */

/* Typography & Heading Modernization */
h1, h2, h3, h4, h5, h6,
.section-headline,
.hero-headline,
.page-title,
.leader-name,
.supervisor-name,
.member-v-name {
  font-family: var(--font-sans) !important;
  font-weight: 700 !important;
  letter-spacing: -0.025em !important;
  text-transform: none !important;
  color: #FFFFFF !important;
}

/* Gradient Display Headings */
.section-headline,
.hero-headline,
.page-title,
.section-title,
h1.section-title,
.section-header h1 {
  background: linear-gradient(135deg, #FFFFFF 20%, #E9D5FF 65%, #C084FC 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  display: inline-block;
  letter-spacing: -0.03em !important;
  text-transform: none !important;
}

.section-subtitle,
.page-subtitle {
  font-family: var(--font-sans) !important;
  font-size: 1.05rem !important;
  line-height: 1.6 !important;
  color: #9CA3AF !important;
  max-width: 720px !important;
  margin-top: 0.5rem !important;
}

/* Micro Monospace Badges & Labels */
.mono-label,
.hud-tag,
.badge-pill,
.section-tag,
.section-badge,
.tag-pill,
.stat-tag,
.member-v-role-badge,
.leader-pill-badge {
  font-family: var(--font-mono) !important;
  font-size: 0.72rem !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  border-radius: 9999px !important;
  padding: 0.28rem 0.85rem !important;
  background: rgba(168, 85, 247, 0.12) !important;
  border: 1px solid rgba(168, 85, 247, 0.3) !important;
  color: #E9D5FF !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
}

.mono-label::before,
.hud-tag::before,
.section-tag::before,
.member-v-role-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #A855F7;
  box-shadow: 0 0 10px #A855F7;
  display: inline-block;
}

/* Status Indicator Pill & Pulsing Dot */
.status-indicator-pill {
  border-radius: 9999px !important;
  background: rgba(168, 85, 247, 0.15) !important;
  border: 1px solid rgba(168, 85, 247, 0.35) !important;
  color: #E9D5FF !important;
  padding: 0.3rem 0.85rem !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  font-family: var(--font-mono) !important;
  font-size: 0.72rem !important;
  letter-spacing: 0.12em !important;
}

.status-dot {
  width: 7px !important;
  height: 7px !important;
  border-radius: 50% !important;
  background: #A855F7 !important;
  box-shadow: 0 0 10px #A855F7, 0 0 20px #A855F7 !important;
  animation: pulse-dot 2s infinite !important;
  display: inline-block !important;
}

@keyframes pulse-dot {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.65;
  }
}

/* ==========================================================================
   OBSIDIAN GLASS CARDS (MATCHING BENTO GRID & 3D STUDIO)
   ========================================================================== */
.hud-card,
.member-hud-card,
.leader-hud-card,
.member-vertical-hud-card,
.timeline-post-card,
.picture-card,
.coming-soon-card,
.arch-layer-card,
.spec-card,
.matrix-card {
  border-radius: 26px !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 50%, rgba(139, 92, 246, 0.07) 100%) !important;
  backdrop-filter: blur(24px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 20px 48px rgba(0, 0, 0, 0.65) !important;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
  position: relative;
  overflow: hidden;
}

/* Dynamic Card Cursor Sheen */
.hud-card::after,
.member-hud-card::after,
.leader-hud-card::after,
.member-vertical-hud-card::after,
.timeline-post-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(400px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(168, 85, 247, 0.14), transparent 65%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
}

.hud-card:hover::after,
.member-hud-card:hover::after,
.leader-hud-card:hover::after,
.member-vertical-hud-card:hover::after,
.timeline-post-card:hover::after {
  opacity: 1;
}

/* Card Hover Elevation & Purple Rim Glow */
.hud-card:hover,
.member-hud-card:hover,
.leader-hud-card:hover,
.member-vertical-hud-card:hover,
.timeline-post-card:hover,
.picture-card:hover,
.coming-soon-card:hover,
.arch-layer-card:hover {
  transform: translateY(-5px) scale(1.006) !important;
  border-color: rgba(168, 85, 247, 0.45) !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 24px 60px -10px rgba(168, 85, 247, 0.3), 0 0 25px rgba(147, 51, 234, 0.15) !important;
}

/* Clean up old chunky brackets for modern sleek glass look */
.corner-bracket,
.corner-bracket-box::before,
.corner-bracket-box::after {
  display: none !important;
}

/* Faculty Supervisor Card (Featured Crownpiece) */
.faculty-supervisor-card {
  border-radius: 32px !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(18, 14, 30, 0.88) 50%, rgba(88, 28, 135, 0.22) 100%) !important;
  backdrop-filter: blur(28px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
  border: 1px solid rgba(168, 85, 247, 0.32) !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 25px 65px rgba(0, 0, 0, 0.8), 0 0 35px rgba(168, 85, 247, 0.16) !important;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.faculty-supervisor-card:hover {
  border-color: rgba(192, 132, 252, 0.6) !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.35), 0 30px 75px -10px rgba(168, 85, 247, 0.4), 0 0 50px rgba(147, 51, 234, 0.25) !important;
  transform: translateY(-4px) !important;
}

.supervisor-photo-frame,
.supervisor-framed-wrapper {
  border-radius: 24px !important;
  overflow: hidden !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6), 0 0 25px rgba(168, 85, 247, 0.25) !important;
}

/* Team Member Photos */
.member-avatar-box,
.leader-avatar-wrapper,
.member-v-avatar-frame {
  border-radius: 20px !important;
  overflow: hidden !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5) !important;
}

/* Timeline Controls: Week Nav & Post Modality Filters */
.week-selector-btn,
.filter-tab-btn {
  border-radius: 9999px !important;
  font-family: var(--font-sans) !important;
  font-size: 0.78rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.02em !important;
  padding: 0.5rem 1.15rem !important;
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #9CA3AF !important;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.week-selector-btn:hover,
.filter-tab-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #FFFFFF !important;
  border-color: rgba(168, 85, 247, 0.4) !important;
  transform: translateY(-2px) !important;
}

.week-selector-btn.active,
.filter-tab-btn.active {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(99, 102, 241, 0.25) 100%) !important;
  border-color: rgba(168, 85, 247, 0.6) !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.35) !important;
}

/* Buttons */
.btn {
  border-radius: 9999px !important;
  font-family: var(--font-sans) !important;
  font-weight: 600 !important;
  letter-spacing: -0.01em !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.btn-primary {
  background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.22) !important;
  color: #FFFFFF !important;
  box-shadow: 0 8px 24px rgba(109, 40, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #9333EA 0%, #7C3AED 100%) !important;
  box-shadow: 0 12px 32px rgba(147, 51, 234, 0.6), 0 0 25px rgba(168, 85, 247, 0.35) !important;
  transform: translateY(-2px) scale(1.02) !important;
}

.btn-ghost {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #F3F4F6 !important;
  backdrop-filter: blur(14px) !important;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(168, 85, 247, 0.45) !important;
  color: #FFFFFF !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(168, 85, 247, 0.2) !important;
}

/* Site Header (Floating Obsidian Pill) */
.site-header {
  height: 76px !important;
  background: rgba(0, 0, 0, 0.65) !important;
  backdrop-filter: blur(24px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7) !important;
}

.site-header.scrolled {
  background: rgba(6, 8, 14, 0.90) !important;
  border-bottom: 1px solid rgba(168, 85, 247, 0.28) !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 25px rgba(168, 85, 247, 0.12) !important;
}

.nav-link {
  font-family: var(--font-sans) !important;
  font-size: 0.84rem !important;
  font-weight: 500 !important;
  color: #9CA3AF !important;
  border-radius: 9999px !important;
  padding: 0.4rem 0.85rem !important;
  transition: all 0.2s ease !important;
}

.nav-link:hover {
  color: #FFFFFF !important;
  background: rgba(255, 255, 255, 0.08) !important;
}

.nav-link.active {
  color: #FFFFFF !important;
  background: rgba(168, 85, 247, 0.22) !important;
  border: 1px solid rgba(168, 85, 247, 0.4) !important;
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.3) !important;
}

/* Form Controls & Inputs (Survey & Contact Pages) */
input[type="text"],
input[type="email"],
input[type="tel"],
textarea,
select,
.hud-input,
.contact-input {
  border-radius: 16px !important;
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(14px) !important;
  color: #FFFFFF !important;
  font-family: var(--font-sans) !important;
  padding: 0.85rem 1.2rem !important;
  transition: all 0.25s ease !important;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus,
select:focus,
.hud-input:focus,
.contact-input:focus {
  border-color: rgba(168, 85, 247, 0.65) !important;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3) !important;
  outline: none !important;
  background: rgba(255, 255, 255, 0.07) !important;
}

/* Matrix & Specification Tables */
.pinout-table,
.bom-table,
.matrix-table {
  border-radius: 20px !important;
  overflow: hidden !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  background: rgba(15, 18, 28, 0.6) !important;
  backdrop-filter: blur(20px) !important;
}

.pinout-table th,
.bom-table th,
.matrix-table th {
  background: rgba(168, 85, 247, 0.12) !important;
  color: #E9D5FF !important;
  font-family: var(--font-mono) !important;
  font-size: 0.72rem !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
}

/* Media, Video & Lightbox Modules */
.timeline-module-wrapper,
.video-module-wrapper,
.tab-module-wrapper,
.lightbox-content {
  border-radius: 28px !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(12, 16, 26, 0.85) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.09) !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7) !important;
}

/* Staggered Scroll Reveal Animations */
.scroll-reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
`;

css = newTop + baseCss + designSystemOverrides;
fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully updated styles.css with full cosmic design system!');
