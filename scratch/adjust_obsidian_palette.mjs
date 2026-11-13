import fs from 'fs';

const filePath = 'public/css/styles.css';
let css = fs.readFileSync(filePath, 'utf8');

// 1. Recalibrate frosted-glass-bg: 95% pitch black (#000000) with very faint, subtle ambient halos (0.04 - 0.05 opacity)
const newAtmosphere = `.frosted-glass-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0 !important;
  overflow: hidden;
  background: 
    radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(168, 85, 247, 0.035), transparent 60%),
    radial-gradient(circle 650px at 10% 15%, rgba(139, 92, 246, 0.04) 0%, transparent 65%),
    radial-gradient(circle 750px at 90% 80%, rgba(59, 130, 246, 0.035) 0%, transparent 65%),
    #000000;
}`;

css = css.replace(/\.frosted-glass-bg\s*\{[\s\S]*?background:[\s\S]*?#000000;[\s\S]*?\}/g, newAtmosphere);

// 2. Recalibrate Display Headings: crisp solid white with subtle metallic zinc falloff (NO heavy purple gradient!)
const newHeadings = `/* Display Headings (Predominantly Pure White matching Homepage) */
.section-headline,
.hero-headline,
.page-title,
.section-title,
h1.section-title,
.section-header h1,
h2.section-title {
  background: linear-gradient(135deg, #FFFFFF 60%, #F4F4F5 85%, #E4E4E7 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  color: #FFFFFF !important;
  display: inline-block;
  letter-spacing: -0.03em !important;
  text-transform: none !important;
}`;

css = css.replace(/\/\* Gradient Display Headings \*\/[\s\S]*?text-transform:\s*none\s*!important;\s*\}/, newHeadings);

// 3. Recalibrate Section Tags / Badges: Mostly black/dark translucent pill with neutral zinc text + purple accent dot
const newBadges = `/* Micro Monospace Badges & Labels (Subtle Black Translucent with Purple Accent Dot) */
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
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  border-radius: 9999px !important;
  padding: 0.28rem 0.85rem !important;
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  color: #E4E4E7 !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.45rem !important;
}

.mono-label::before,
.hud-tag::before,
.section-tag::before,
.member-v-role-badge::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #A855F7;
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
  display: inline-block;
}`;

css = css.replace(/\/\* Micro Monospace Badges & Labels \*\/[\s\S]*?display:\s*inline-block;\s*\}/, newBadges);

// 4. Recalibrate Cards: Pure Dark Obsidian (mostly black, neutral borders, purple only as hover accent!)
const newCards = `/* Primary Glass Cards (Predominantly Black Obsidian Canvas with Neutral Hairline Bevel) */
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0%, rgba(10, 10, 14, 0.90) 45%, rgba(4, 4, 6, 0.96) 100%) !important;
  backdrop-filter: blur(28px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.12),
    0 20px 50px rgba(0, 0, 0, 0.80) !important;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.35s ease, 
              background 0.35s ease !important;
  position: relative !important;
  overflow: hidden !important;
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

/* Subtle Corner Halo (Faint in rest state, gently blooms on hover) */
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
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%);
  filter: blur(45px);
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
  transform: scale(1.3);
  background: radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%);
  filter: blur(55px);
}

/* Card Hover Elevation: Neutral Bevel with Delicate Purple Rim Glow */
.hud-card:hover,
.member-hud-card:hover,
.leader-hud-card:hover,
.member-vertical-hud-card:hover,
.timeline-post-card:hover,
.picture-card:hover,
.coming-soon-card:hover,
.arch-layer-card:hover {
  transform: translateY(-5px) scale(1.006) !important;
  border-color: rgba(168, 85, 247, 0.35) !important;
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.22),
    0 26px 65px -10px rgba(0, 0, 0, 0.85),
    0 0 25px rgba(168, 85, 247, 0.15) !important;
}

/* Faculty Supervisor Card (Dark Obsidian with Refined Gold & Purple Accents) */
.faculty-supervisor-card {
  border-radius: 32px !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(12, 12, 16, 0.92) 45%, rgba(6, 6, 8, 0.98) 100%) !important;
  backdrop-filter: blur(32px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(32px) saturate(180%) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.16),
    0 25px 65px rgba(0, 0, 0, 0.85) !important;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease !important;
  position: relative !important;
  overflow: hidden !important;
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
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%);
  filter: blur(55px);
  pointer-events: none;
  transition: transform 0.5s ease;
  z-index: 1;
}

.faculty-supervisor-card:hover {
  border-color: rgba(168, 85, 247, 0.40) !important;
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.28),
    0 30px 75px rgba(0, 0, 0, 0.9), 
    0 0 35px rgba(168, 85, 247, 0.20) !important;
  transform: translateY(-5px) scale(1.004) !important;
}

/* Nested Sub-Cards, Feature Rows, and Inner Glass Panels (Predominantly Black) */
.hud-feature-item,
.faculty-research-box,
.leader-quote-box,
.arch-layer-card,
.corner-bracket-box.hud-card > div[style*="display: grid"] > div {
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(255, 255, 255, 0.06) !important;
  border-radius: 18px !important;
  padding: 1.25rem !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 6px 20px rgba(0, 0, 0, 0.45) !important;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease !important;
}

.hud-feature-item:hover,
.faculty-research-box:hover,
.leader-quote-box:hover,
.arch-layer-card:hover,
.corner-bracket-box.hud-card > div[style*="display: grid"] > div:hover {
  transform: translateY(-3px) !important;
  border-color: rgba(168, 85, 247, 0.30) !important;
  background: rgba(255, 255, 255, 0.04) !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.16), 0 12px 28px rgba(0, 0, 0, 0.6), 0 0 15px rgba(168, 85, 247, 0.10) !important;
}`;

css = css.replace(/\/\* Primary Glass Cards[\s\S]*?\.corner-bracket-box\.hud-card > div\[style\*=\"display: grid\"\] > div:hover\s*\{[\s\S]*?\}/, newCards);

fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully adjusted color ratio: mostly black obsidian with subtle purple accents!');
