import fs from 'fs';

const filePath = 'public/css/styles.css';
let css = fs.readFileSync(filePath, 'utf8');

// Find the section "/* ==========================================================================\n   OBSIDIAN GLASS CARDS (MATCHING BENTO GRID & 3D STUDIO)"
const startMarker = '/* ==========================================================================\n   OBSIDIAN GLASS CARDS (MATCHING BENTO GRID & 3D STUDIO)';
const endMarker = '/* ==========================================================================\n   CLEAN BORDERLESS HORIZONTAL SIDE-SCROLLABLE NAV';

const startIdx = css.indexOf(startMarker);
const endIdx = css.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate markers in styles.css');
  console.log('startIdx:', startIdx, 'endIdx:', endIdx);
  process.exit(1);
}

const newGlassSystem = `/* ==========================================================================
   FOCUSBOT // HOMEPAGE GLASSMORPHISM, HIGH-BLUR & KINETIC ANIMATION SYSTEM
   Directly ported from Homepage Bento Grid & Neural 3D Studio:
   - Ultra-translucent crystalline glass (blur 32px - 40px, saturate 210%)
   - Ambient corner glow halos (the signature Bento Orb)
   - Spring physics hover lift (translateY -6px, scale 1.008)
   - Specular top rim highlight (inset 0 1px 1px rgba(255,255,255,0.22))
   - Cursor-tracked radial shimmer sheen
   - Staggered entrance cascade animations
   ========================================================================== */

/* Staggered Entrance Keyframes */
@keyframes homeCardFadeUp {
  0% {
    opacity: 0;
    transform: translateY(28px) scale(0.985);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Primary Glass Cards */
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
  border-radius: 28px !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.018) 40%, rgba(139, 92, 246, 0.09) 100%) !important;
  backdrop-filter: blur(32px) saturate(210%) !important;
  -webkit-backdrop-filter: blur(32px) saturate(210%) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.20),
    inset 0 0 25px 0 rgba(168, 85, 247, 0.04),
    0 20px 50px rgba(0, 0, 0, 0.65) !important;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.35s ease, 
              background 0.35s ease !important;
  position: relative !important;
  overflow: hidden !important;
  animation: homeCardFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Ensure card contents stay on top of ambient glows */
.hud-card > *,
.member-hud-card > *,
.leader-hud-card > *,
.member-vertical-hud-card > *,
.timeline-post-card > *,
.picture-card > *,
.arch-layer-card > * {
  position: relative;
  z-index: 2;
}

/* Signature Ambient Corner Glow Orb (Bento Halo) */
.hud-card::before,
.member-hud-card::before,
.leader-hud-card::before,
.member-vertical-hud-card::before,
.timeline-post-card::before,
.picture-card::before,
.arch-layer-card::before {
  content: '';
  position: absolute;
  top: -50px;
  left: -50px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.20) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 70%);
  filter: blur(50px);
  pointer-events: none;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s ease;
  z-index: 1;
}

.hud-card:hover::before,
.member-hud-card:hover::before,
.leader-hud-card:hover::before,
.member-vertical-hud-card:hover::before,
.timeline-post-card:hover::before,
.picture-card:hover::before,
.arch-layer-card:hover::before {
  transform: scale(1.4);
  background: radial-gradient(circle, rgba(168, 85, 247, 0.32) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 70%);
  filter: blur(60px);
}

/* Interactive Mouse-Tracked Sheen Overlay */
.hud-card::after,
.member-hud-card::after,
.leader-hud-card::after,
.member-vertical-hud-card::after,
.timeline-post-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(450px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(168, 85, 247, 0.16), transparent 65%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
  z-index: 1;
}

.hud-card:hover::after,
.member-hud-card:hover::after,
.leader-hud-card:hover::after,
.member-vertical-hud-card:hover::after,
.timeline-post-card:hover::after {
  opacity: 1;
}

/* Card Hover Elevation & Radiant Purple Bloom */
.hud-card:hover,
.member-hud-card:hover,
.leader-hud-card:hover,
.member-vertical-hud-card:hover,
.timeline-post-card:hover,
.picture-card:hover,
.coming-soon-card:hover,
.arch-layer-card:hover {
  transform: translateY(-6px) scale(1.008) !important;
  border-color: rgba(168, 85, 247, 0.50) !important;
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.35),
    0 28px 70px -10px rgba(0, 0, 0, 0.75),
    0 0 35px rgba(168, 85, 247, 0.28) !important;
}

/* Clean up old chunky brackets */
.corner-bracket,
.corner-bracket-box::before,
.corner-bracket-box::after {
  display: none !important;
}

/* Featured Faculty Supervisor Card (Crownpiece) */
.faculty-supervisor-card {
  border-radius: 34px !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(18, 14, 32, 0.82) 45%, rgba(88, 28, 135, 0.25) 100%) !important;
  backdrop-filter: blur(36px) saturate(215%) !important;
  -webkit-backdrop-filter: blur(36px) saturate(215%) !important;
  border: 1px solid rgba(168, 85, 247, 0.35) !important;
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.28),
    0 30px 75px rgba(0, 0, 0, 0.8), 
    0 0 45px rgba(168, 85, 247, 0.20) !important;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease !important;
  position: relative !important;
  overflow: hidden !important;
  animation: homeCardFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.faculty-supervisor-card > * {
  position: relative;
  z-index: 2;
}

.faculty-supervisor-card::before {
  content: '';
  position: absolute;
  top: -80px;
  left: -80px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
  transition: transform 0.5s ease;
  z-index: 1;
}

.faculty-supervisor-card:hover {
  border-color: rgba(192, 132, 252, 0.65) !important;
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.45),
    0 35px 85px -10px rgba(168, 85, 247, 0.45), 
    0 0 60px rgba(147, 51, 234, 0.30) !important;
  transform: translateY(-6px) scale(1.006) !important;
}

.supervisor-photo-frame,
.supervisor-framed-wrapper {
  border-radius: 26px !important;
  overflow: hidden !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.65), 0 0 30px rgba(168, 85, 247, 0.3) !important;
}

/* Nested Sub-Cards, Feature Rows, and Inner Glass Panels */
.hud-feature-item,
.faculty-research-box,
.leader-quote-box,
.arch-layer-card,
.corner-bracket-box.hud-card > div[style*="display: grid"] > div {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 50%, rgba(139, 92, 246, 0.05) 100%) !important;
  backdrop-filter: blur(20px) saturate(190%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(190%) !important;
  border: 1px solid rgba(255, 255, 255, 0.09) !important;
  border-radius: 20px !important;
  padding: 1.25rem !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 8px 24px rgba(0, 0, 0, 0.35) !important;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease !important;
}

.hud-feature-item:hover,
.faculty-research-box:hover,
.leader-quote-box:hover,
.arch-layer-card:hover,
.corner-bracket-box.hud-card > div[style*="display: grid"] > div:hover {
  transform: translateY(-3px) !important;
  border-color: rgba(168, 85, 247, 0.45) !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(168, 85, 247, 0.06) 100%) !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 14px 32px rgba(168, 85, 247, 0.20) !important;
}

/* Staggered Grid Item Delays */
.hud-grid-2 > :nth-child(1), .three-members-grid > :nth-child(1), .hud-grid-3 > :nth-child(1) { animation-delay: 0.04s; }
.hud-grid-2 > :nth-child(2), .three-members-grid > :nth-child(2), .hud-grid-3 > :nth-child(2) { animation-delay: 0.12s; }
.hud-grid-2 > :nth-child(3), .three-members-grid > :nth-child(3), .hud-grid-3 > :nth-child(3) { animation-delay: 0.20s; }
.hud-grid-2 > :nth-child(4), .three-members-grid > :nth-child(4), .hud-grid-3 > :nth-child(4) { animation-delay: 0.28s; }

/* Tactical Tables (Pinouts & BOM) */
.tactical-table-wrapper {
  padding: 1.5rem !important;
  border-radius: 26px !important;
}

.tactical-table {
  border-collapse: separate !important;
  border-spacing: 0 0.5rem !important;
}

.tactical-table tr td {
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(14px) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
  transition: all 0.2s ease !important;
}

.tactical-table tr td:first-child {
  border-left: 1px solid rgba(255, 255, 255, 0.06) !important;
  border-top-left-radius: 12px !important;
  border-bottom-left-radius: 12px !important;
}

.tactical-table tr td:last-child {
  border-right: 1px solid rgba(255, 255, 255, 0.06) !important;
  border-top-right-radius: 12px !important;
  border-bottom-right-radius: 12px !important;
}

.tactical-table tr:hover td {
  background: rgba(168, 85, 247, 0.12) !important;
  border-color: rgba(168, 85, 247, 0.35) !important;
  color: #FFFFFF !important;
  transform: translateY(-1px);
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
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #9CA3AF !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.week-selector-btn:hover,
.filter-tab-btn:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  color: #FFFFFF !important;
  border-color: rgba(168, 85, 247, 0.45) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 18px rgba(168, 85, 247, 0.25) !important;
}

.week-selector-btn.active,
.filter-tab-btn.active {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.35) 0%, rgba(99, 102, 241, 0.30) 100%) !important;
  border-color: rgba(168, 85, 247, 0.65) !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4) !important;
}

/* Atmosphere Cosmic Halos Drift (Matching Homepage) */
.frosted-glass-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  background: 
    radial-gradient(circle 850px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(168, 85, 247, 0.12), transparent 60%),
    radial-gradient(circle 800px at 10% 20%, rgba(139, 92, 246, 0.18) 0%, transparent 65%),
    radial-gradient(circle 850px at 90% 70%, rgba(59, 130, 246, 0.14) 0%, transparent 65%),
    radial-gradient(circle 950px at 50% 50%, rgba(88, 28, 135, 0.20) 0%, transparent 70%),
    radial-gradient(circle 600px at 70% 15%, rgba(255, 94, 14, 0.05) 0%, transparent 60%),
    #000000;
  animation: cosmicBreathing 18s ease-in-out infinite alternate;
}

@keyframes cosmicBreathing {
  0% {
    filter: brightness(1) saturate(1);
    transform: scale(1);
  }
  50% {
    filter: brightness(1.24) saturate(1.30);
    transform: scale(1.025);
  }
  100% {
    filter: brightness(1.08) saturate(1.15);
    transform: scale(1);
  }
}

`;

const updatedCss = css.slice(0, startIdx) + newGlassSystem + '\n\n' + css.slice(endIdx);
fs.writeFileSync(filePath, updatedCss, 'utf8');
console.log('Successfully upgraded public/css/styles.css with homepage blur, glass, and animation system!');
