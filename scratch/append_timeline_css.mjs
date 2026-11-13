import fs from 'fs';

const cssToAdd = `
/* ==========================================================================
   INTERACTIVE CYBER-FROSTED TIMELINE DECK & TELEMETRY CINEMA MODAL
   ========================================================================== */

/* 1. Progress Stepper Bar */
.timeline-stepper-wrap {
  margin-bottom: 3rem;
  padding: 1.5rem 2rem;
  background: rgba(10, 12, 22, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;
  overflow-x: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.timeline-stepper-track {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 680px;
  position: relative;
}

.timeline-stepper-line {
  position: absolute;
  top: 18px;
  left: 40px;
  right: 40px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.timeline-stepper-progress {
  position: absolute;
  top: 18px;
  left: 40px;
  width: 78%;
  height: 2px;
  background: linear-gradient(90deg, #8B5CF6, #A855F7, #38BDF8);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.8);
  z-index: 2;
  transition: width 0.5s ease;
}

.stepper-node {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  transition: all 0.25s ease;
}

.stepper-node:hover .node-dot {
  transform: scale(1.25);
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.9);
}

.node-dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  background: #090B12;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #94A3B8;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.stepper-node.completed .node-dot {
  background: #120E24;
  border-color: #A855F7;
  color: #C084FC;
  box-shadow: 0 0 14px rgba(168, 85, 247, 0.4);
}

.stepper-node.active .node-dot {
  background: #8B5CF6;
  border-color: #FFFFFF;
  color: #FFFFFF;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.9);
  animation: pulseNode 2s infinite;
}

@keyframes pulseNode {
  0%, 100% { box-shadow: 0 0 14px rgba(168, 85, 247, 0.7); }
  50% { box-shadow: 0 0 24px rgba(168, 85, 247, 1); }
}

.stepper-node.upcoming .node-dot {
  border-style: dashed;
  color: #64748B;
  opacity: 0.6;
}

.node-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
  color: #94A3B8;
  white-space: nowrap;
}

.stepper-node.active .node-label {
  color: #C084FC;
  font-weight: 700;
}

/* 2. Bento Deck Cards Grid */
.timeline-deck-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
}

@media (max-width: 640px) {
  .timeline-deck-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.timeline-deck-card {
  position: relative;
  border-radius: 24px;
  background: linear-gradient(145deg, rgba(16, 18, 30, 0.75) 0%, rgba(8, 10, 18, 0.85) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
  cursor: pointer;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.timeline-deck-card:hover {
  transform: translateY(-6px) scale(1.01);
  border-color: rgba(168, 85, 247, 0.45);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(168, 85, 247, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.25);
}

.timeline-deck-card.active-sprint {
  border-color: rgba(168, 85, 247, 0.5);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 85, 247, 0.3);
  animation: activeSprintGlow 3s infinite;
}

@keyframes activeSprintGlow {
  0%, 100% {
    border-color: rgba(168, 85, 247, 0.4);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(168, 85, 247, 0.25);
  }
  50% {
    border-color: rgba(192, 132, 252, 0.8);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 45px rgba(168, 85, 247, 0.5);
  }
}

/* Card Visual Thumbnail Header */
.card-thumb-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #04060A;
}

.card-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
  filter: brightness(0.9);
}

.timeline-deck-card:hover .card-thumb-img {
  transform: scale(1.06);
  filter: brightness(1);
}

.card-thumb-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6, 8, 14, 0.2) 0%, rgba(6, 8, 14, 0.85) 100%);
  pointer-events: none;
}

.card-thumb-play {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: rgba(10, 12, 22, 0.85);
  border: 1px solid rgba(168, 85, 247, 0.5);
  color: #E9D5FF;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
}

.card-thumb-play svg {
  color: #C084FC;
}

.card-thumb-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: rgba(6, 8, 14, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  backdrop-filter: blur(12px);
}

/* Card Body Content */
.card-deck-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 1.25rem;
}

.card-meta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.7rem;
}

.card-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.card-status-pill.completed {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.card-status-pill.active {
  background: rgba(168, 85, 247, 0.2);
  color: #E9D5FF;
  border: 1px solid rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
}

.card-status-pill.upcoming {
  background: rgba(148, 163, 184, 0.1);
  color: #94A3B8;
  border: 1px solid rgba(148, 163, 184, 0.25);
}

.card-timestamp-text {
  color: #64748B;
  font-size: 0.65rem;
}

.card-main-title {
  font-family: var(--font-sans);
  font-size: 1.15rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.35;
  letter-spacing: -0.01em;
  margin: 0;
}

.card-desc-snippet {
  font-size: 0.82rem;
  color: #94A3B8;
  line-height: 1.55;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Deliverable Badges / Chips */
.card-intel-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.intel-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.55rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: #CBD5E1;
  font-weight: 500;
}

.intel-chip.video-chip {
  color: #C084FC;
  border-color: rgba(168, 85, 247, 0.3);
  background: rgba(168, 85, 247, 0.08);
}

.intel-chip.spec-chip {
  color: #38BDF8;
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(56, 189, 248, 0.08);
}

/* Card Action Pill Button */
.card-expand-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #C084FC;
  transition: all 0.25s ease;
}

.timeline-deck-card:hover .card-expand-action {
  color: #FFFFFF;
}

.action-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
  color: #C084FC;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline-deck-card:hover .action-arrow {
  background: #8B5CF6;
  color: #FFFFFF;
  transform: translateX(4px);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.8);
}

/* ==========================================================================
   3. SEAMLESS TELEMETRY CINEMA MODAL (POPUP)
   ========================================================================== */
.telemetry-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(4, 5, 10, 0.85);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.telemetry-modal-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.telemetry-modal-window {
  position: relative;
  width: 100%;
  max-width: 1020px;
  max-height: 90vh;
  border-radius: 28px;
  background: linear-gradient(160deg, rgba(16, 18, 32, 0.96) 0%, rgba(8, 10, 18, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(168, 85, 247, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: scale(0.95) translateY(20px);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.telemetry-modal-overlay.open .telemetry-modal-window {
  transform: scale(1) translateY(0);
}

/* Modal Top Bezel Bar */
.modal-bezel-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(6, 8, 14, 0.7);
  position: sticky;
  top: 0;
  z-index: 10;
}

.modal-bezel-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-week-badge {
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.4);
  color: #E9D5FF;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.modal-bezel-controls {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.modal-nav-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #CBD5E1;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-nav-pill-btn:hover:not(:disabled) {
  background: rgba(168, 85, 247, 0.2);
  border-color: rgba(168, 85, 247, 0.4);
  color: #FFFFFF;
}

.modal-nav-pill-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.modal-close-icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #94A3B8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close-icon-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
  color: #FFFFFF;
  transform: scale(1.08);
}

/* Modal Title Header */
.modal-title-header {
  padding: 1.5rem 2rem 0.5rem;
}

.modal-heading {
  font-family: var(--font-sans);
  font-size: 1.4rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.3;
  margin: 0 0 0.5rem;
}

.modal-subcaption {
  font-size: 0.85rem;
  color: #94A3B8;
  line-height: 1.6;
  margin: 0;
}

/* Modal Tabs Navigation */
.modal-tabs-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-tab-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1.1rem;
  border-radius: 12px 12px 0 0;
  background: transparent;
  border: 1px solid transparent;
  border-bottom: none;
  color: #94A3B8;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.modal-tab-trigger:hover {
  color: #FFFFFF;
}

.modal-tab-trigger.active {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
  color: #C084FC;
}

.modal-tab-trigger.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #A855F7, #38BDF8);
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.9);
}

/* Modal Body Content Area */
.modal-body-scroll {
  padding: 1.75rem 2rem 2.5rem;
  overflow-y: auto;
  flex: 1;
  max-height: calc(90vh - 200px);
}

.modal-body-scroll::-webkit-scrollbar {
  width: 6px;
}
.modal-body-scroll::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}
.modal-body-scroll::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.3);
  border-radius: 3px;
}

/* Modal Checklist */
.modal-checklist {
  list-style: none;
  padding: 0;
  margin: 1.25rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modal-checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem 1.15rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.85rem;
  line-height: 1.5;
  color: #E2E8F0;
}

.modal-check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #34D399;
  font-size: 0.7rem;
  font-weight: 900;
  shrink: 0;
  margin-top: 2px;
}

/* Modal Gallery Grid */
.modal-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.gallery-preview-card {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(6, 8, 14, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-preview-card:hover {
  transform: translateY(-4px);
  border-color: rgba(168, 85, 247, 0.5);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
}

.gallery-preview-img {
  width: 100%;
  height: 190px;
  object-fit: cover;
  display: block;
}

.gallery-preview-caption {
  padding: 0.75rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: #94A3B8;
  line-height: 1.4;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

/* Modal Video Player Card */
.modal-video-box {
  border-radius: 20px;
  overflow: hidden;
  background: #000000;
  border: 1px solid rgba(168, 85, 247, 0.3);
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.15);
  margin-bottom: 1.5rem;
}

.modal-video-elem {
  width: 100%;
  max-height: 520px;
  display: block;
  background: #000;
}
`;

const stylesPath = 'public/css/styles.css';
let content = fs.readFileSync(stylesPath, 'utf8');

if (!content.includes('INTERACTIVE CYBER-FROSTED TIMELINE DECK')) {
  content += '\n' + cssToAdd;
  fs.writeFileSync(stylesPath, content, 'utf8');
  console.log('Successfully appended interactive timeline CSS to styles.css');
} else {
  console.log('Interactive timeline CSS already present in styles.css');
}
