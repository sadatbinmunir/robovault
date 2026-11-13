import fs from 'fs';
import path from 'path';

const srcDir = 'C:/Users/user/Desktop/robo project extract from here';
const indexHtml = fs.readFileSync(`${srcDir}/index.html`, 'utf8');
const teamHtml = fs.readFileSync(`${srcDir}/team.html`, 'utf8');

// Shared Nav Header Generator
function generateHeader(activeRoute) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Overview", href: "/overview" },
    { label: "Team & Faculty", href: "/team" },
    { label: "Literature", href: "/literature" },
    { label: "Timeline", href: "/timeline" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Architecture", href: "/architecture" },
    { label: "Schematics", href: "/schematics" },
    { label: "Survey", href: "/survey" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const railLinks = navItems.map(item => {
    const isActive = activeRoute === item.href;
    return `        <a href="${item.href}" class="nav-rail-item ${isActive ? 'active' : ''}">${item.label}</a>`;
  }).join('\n');

  return `  <!-- ==========================================================================
       TOP FLOATING EDITORIAL NAVBAR WITH HORIZONTAL SIDE-SCROLL (SEPARATED PAGES)
       ========================================================================== -->
  <header class="home-style-header">
    
    <!-- Top Left: Focusbot.Ai Brand Logo Link -->
    <div class="header-logo-wrapper">
      <a href="/" class="focusbot-brand-link" aria-label="Focusbot.Ai Home">
        <span class="brand-text-white">Focusbot</span><span class="brand-text-gradient">.Ai</span>
      </a>
    </div>

    <!-- Center: Horizontal Side-Scrollable Page Selectors Rail -->
    <div class="header-scroll-rail-wrapper">
      <button type="button" class="rail-scroll-arrow rail-arrow-left" id="railScrollLeftBtn" aria-label="Scroll left">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <nav class="quick-nav-scroll-container" id="quickNavScrollContainer" aria-label="All Pages Navigation">
${railLinks}
      </nav>

      <button type="button" class="rail-scroll-arrow rail-arrow-right" id="railScrollRightBtn" aria-label="Scroll right">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

    <!-- Top Right: "Pages" Dropdown & Minimalist Circle Exit Button -->
    <div class="header-nav-wrapper" id="pagesNavDropdownWrapper">
      <div class="nav-controls-row">
        
        <!-- Minimalist Circle Button -->
        <a href="/" class="center-focus-btn" title="Back to 3D Robotics Studio Home" aria-label="Home">
          <svg class="center-x-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </a>

        <!-- Main "Pages" Button Thingy with animated dropdown trigger -->
        <button type="button" class="pages-trigger-btn" id="pagesDropdownBtn" aria-expanded="false" aria-label="Explore other pages">
          <span class="pages-pulse-dot"></span>
          <span class="pages-btn-text">Pages</span>
          <svg class="pages-chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

      </div>

      <!-- Dropdown Menu Modal -->
      <div class="pages-dropdown-menu" id="pagesDropdownMenu" aria-hidden="true">
        <div class="dropdown-header-bar">
          <span class="dropdown-section-title">PROJECT DIRECTORY</span>
          <span class="dropdown-dept-title">CCDS HCI WING</span>
        </div>

        <div class="dropdown-links-list">
          <a href="/overview" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(99, 102, 241, 0.2)); color: #C084FC;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">Project Overview</span><span class="dropdown-item-tag">THESIS</span></div>
              <p class="dropdown-item-desc">Core mission, desk companion tenets &amp; goals</p>
            </div>
          </a>

          <a href="/team" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(99, 102, 241, 0.2)); color: #C084FC;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">Team &amp; Faculty</span><span class="dropdown-item-tag">SUPERVISION</span></div>
              <p class="dropdown-item-desc">Faculty supervisor &amp; research engineers</p>
            </div>
          </a>

          <a href="/literature" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(244, 63, 94, 0.2)); color: #F472B6;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">Literature Reviews</span><span class="dropdown-item-tag">ACADEMIC</span></div>
              <p class="dropdown-item-desc">IEEE paper draft, research papers &amp; PDFs</p>
            </div>
          </a>

          <a href="/timeline" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2)); color: #22D3EE;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">Project Timeline</span><span class="dropdown-item-tag">SPRINTS</span></div>
              <p class="dropdown-item-desc">Weekly milestones, specs &amp; video logs</p>
            </div>
          </a>

          <a href="/roadmap" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.2)); color: #FB923C;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">System Roadmap</span><span class="dropdown-item-tag">HORIZONS</span></div>
              <p class="dropdown-item-desc">Hardware trajectory &amp; neural expansion</p>
            </div>
          </a>

          <a href="/architecture" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2)); color: #A78BFA;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">System Architecture</span><span class="dropdown-item-tag">PIPELINE</span></div>
              <p class="dropdown-item-desc">ROS2, dual-core ESP32 &amp; edge neural stack</p>
            </div>
          </a>

          <a href="/schematics" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2)); color: #34D399;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">Hardware Schematics</span><span class="dropdown-item-tag">CIRCUITS</span></div>
              <p class="dropdown-item-desc">Circuit pinouts, BOM matrix &amp; PCB CAD</p>
            </div>
          </a>

          <a href="/survey" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(244, 63, 94, 0.2)); color: #F472B6;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><polyline points="9 14 12 17 17 12"></polyline></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">HRI Study Survey</span><span class="dropdown-item-tag">RESEARCH</span></div>
              <p class="dropdown-item-desc">Desk companion user study questionnaire</p>
            </div>
          </a>

          <a href="/about" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2)); color: #A78BFA;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">About FocusBot</span><span class="dropdown-item-tag">MISSION</span></div>
              <p class="dropdown-item-desc">Core tenets, privacy &amp; lab affiliation</p>
            </div>
          </a>

          <a href="/contact" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(113, 113, 122, 0.2), rgba(148, 163, 184, 0.2)); color: #D4D4D8;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">Contact Channels</span><span class="dropdown-item-tag">INQUIRIES</span></div>
              <p class="dropdown-item-desc">Direct email &amp; lab location</p>
            </div>
          </a>
        </div>

        <div class="dropdown-footer-bar">
          <a href="/" class="dropdown-home-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>3D Robotics Studio Home</span>
          </a>
          <button type="button" class="dropdown-esc-btn" id="pagesDropdownCloseBtn">ESC</button>
        </div>
      </div>
    </div>

  </header>`;
}

// Generate Full HTML Page Template
function buildPage({ title, description, activeRoute, contentHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} // FocusBot.Ai</title>
  <meta name="description" content="${description}">
  
  <!-- Fonts: Space Grotesk, Rajdhani, JetBrains Mono, Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body class="tactical-hud-body">

  <!-- Ambient Backdrop & PCB Overlay -->
  <div class="frosted-glass-bg" aria-hidden="true"></div>

  ${generateHeader(activeRoute)}

  <!-- Main Content Area -->
  <main style="padding-top: calc(var(--header-height) + 2.5rem); min-height: 85vh; padding-bottom: 5rem;">
    <div class="container">
      ${contentHtml}
    </div>
  </main>

  <!-- Site Footer -->
  <footer class="site-footer" id="siteFooter">
    <div class="container footer-container">
      <div class="footer-top-row">
        <a href="/" class="footer-brand">
          <span style="font-weight: 700; color: #ffffff;">Focusbot</span><span style="color: #A855F7; font-weight: 700;">.Ai</span>
        </a>
        <div class="footer-telemetry-tag">
          <span>CCDS HCI WING // INDEPENDENT UNIVERSITY, BANGLADESH</span>
        </div>
      </div>
      <div class="footer-bottom-row" style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #9CA3AF;">
        <p>&copy; 2026 FocusBot Embodied Robotics. All research rights reserved.</p>
        <div style="display: flex; gap: 1.5rem;">
          <a href="/overview" style="color: #9CA3AF; text-decoration: none;">Overview</a>
          <a href="/team" style="color: #9CA3AF; text-decoration: none;">Team</a>
          <a href="/literature" style="color: #9CA3AF; text-decoration: none;">Literature</a>
          <a href="/timeline" style="color: #9CA3AF; text-decoration: none;">Timeline</a>
          <a href="/roadmap" style="color: #9CA3AF; text-decoration: none;">Roadmap</a>
          <a href="/about" style="color: #9CA3AF; text-decoration: none;">About</a>
          <a href="/contact" style="color: #9CA3AF; text-decoration: none;">Contact</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="/js/main.js"></script>
</body>
</html>`;
}

// 1. EXTRACT OVERVIEW SECTION
const overviewStart = indexHtml.indexOf('<section class="section-block" id="overview">');
const overviewEnd = indexHtml.indexOf('</section>', overviewStart);
const overviewContent = indexHtml.substring(overviewStart, overviewEnd + 10);

const overviewPage = buildPage({
  title: 'Project Overview & Goals',
  description: 'Executive overview, thesis, and core capabilities of FocusBot embodied desk robotics.',
  activeRoute: '/overview',
  contentHtml: overviewContent
});
fs.writeFileSync('public/overview.html', overviewPage, 'utf8');
console.log('Created public/overview.html');

// 2. EXTRACT SOFTWARE ARCHITECTURE SECTION
const archStart = indexHtml.indexOf('<section class="section-block" id="software-architecture">');
const archEnd = indexHtml.indexOf('</section>', archStart);
const archContent = indexHtml.substring(archStart, archEnd + 10);

const archPage = buildPage({
  title: 'System & Software Architecture',
  description: 'Dual-tier embedded runtime, FreeRTOS, and multi-tier neural pipeline specification.',
  activeRoute: '/architecture',
  contentHtml: archContent
});
fs.writeFileSync('public/architecture.html', archPage, 'utf8');
console.log('Created public/architecture.html');

// 3. EXTRACT SCHEMATICS & BOM SECTION
const equipStart = indexHtml.indexOf('<section class="section-block" id="equipments">');
const equipEnd = indexHtml.indexOf('</section>', equipStart);
const equipContent = indexHtml.substring(equipStart, equipEnd + 10);

const schematicsPage = buildPage({
  title: 'Hardware Schematics & Pinouts',
  description: 'Bill of Materials, component procurement list, and ESP32-S3 GPIO pinout matrix.',
  activeRoute: '/schematics',
  contentHtml: equipContent
});
fs.writeFileSync('public/schematics.html', schematicsPage, 'utf8');
console.log('Created public/schematics.html');

// 4. EXTRACT LITERATURE REVIEW & PAPER ARCHIVE
const litStart = indexHtml.indexOf('<section class="section-block" id="literature-review">');
const litEnd = indexHtml.indexOf('</section>', litStart);
const litContent = indexHtml.substring(litStart, litEnd + 10);

const paperStart = indexHtml.indexOf('<section class="section-block" id="paper-draft">');
const paperEnd = indexHtml.indexOf('</section>', paperStart);
const paperContent = indexHtml.substring(paperStart, paperEnd + 10);

// Also extract detailed member literature reviews from team.html
const teamLitStart = teamHtml.indexOf('<div id="literature-review"');
const teamLitEnd = teamHtml.indexOf('<footer class="site-footer"', teamLitStart);
let memberLitContent = '';
if (teamLitStart !== -1 && teamLitEnd !== -1) {
  memberLitContent = teamHtml.substring(teamLitStart, teamLitEnd);
}

const literaturePage = buildPage({
  title: 'Literature Reviews & Paper Draft',
  description: 'Academic foundations, individual member literature reviews, citations, and IEEE paper draft.',
  activeRoute: '/literature',
  contentHtml: `
    ${paperContent}
    <div style="margin-top: 3rem;"></div>
    ${memberLitContent}
  `
});
fs.writeFileSync('public/literature.html', literaturePage, 'utf8');
console.log('Created public/literature.html');

// 5. CLEAN UP TEAM.HTML (Keep purely supervisor and team member bios)
// In team.html, take from main start up to supervisor card + member cards, omitting the huge embedded literature review
const teamMainStart = teamHtml.indexOf('<main');
const supervisorStart = teamHtml.indexOf('<div class="faculty-supervisor-card" id="supervisor">');
const supervisorEnd = teamHtml.indexOf('<div id="literature-review"', supervisorStart);
const supervisorBlock = teamHtml.substring(supervisorStart, supervisorEnd);

const teamPage = buildPage({
  title: 'Faculty Supervision & Research Team',
  description: 'Faculty supervisor Mohammad Shidujaman and undergraduate research engineers.',
  activeRoute: '/team',
  contentHtml: `
    <div class="section-header" style="margin-bottom: 2.5rem;">
      <span class="section-tag">[ 04 — FACULTY SUPERVISION &amp; RESEARCH PERSONNEL ]</span>
      <h1 class="section-title" style="font-size: clamp(2rem, 3.5vw, 3rem);">PROJECT LEADERSHIP &amp; TEAM</h1>
      <p class="section-subtitle">
        Academic guidance, Human-Computer Interaction research wing affiliation, and undergraduate engineering developers driving the FocusBot project.
      </p>
    </div>
    
    ${supervisorBlock}

    <div style="margin-top: 3.5rem; text-align: center; padding: 2.5rem; border-radius: 24px; background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.25);">
      <h3 style="color: #FFFFFF; font-size: 1.3rem; margin-bottom: 0.5rem;">Looking for Team Literature Reviews?</h3>
      <p style="color: #9CA3AF; margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">
        All individual research papers, citations, methodology summaries, and IEEE paper drafts have been organized in the dedicated Literature Archive.
      </p>
      <a href="/literature" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.75rem;">
        <span>Open Literature Reviews Archive</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    </div>
  `
});
fs.writeFileSync('public/team.html', teamPage, 'utf8');
console.log('Created dedicated public/team.html');

// 6. UPDATE EXISTING PAGES (timeline, roadmap, survey, about, contact) WITH STANDALONE HEADER
const existingPages = [
  { file: 'timeline.html', route: '/timeline', title: 'Project Timeline & Milestones' },
  { file: 'roadmap.html', route: '/roadmap', title: 'System Roadmap & Horizons' },
  { file: 'survey.html', route: '/survey', title: 'HRI Study Survey' },
  { file: 'about.html', route: '/about', title: 'About FocusBot' },
  { file: 'contact.html', route: '/contact', title: 'Contact Channels' },
];

existingPages.forEach(p => {
  const filePath = path.join('public', p.file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Replace header with generateHeader(p.route)
  const headerStart = html.indexOf('<header');
  const headerEnd = html.indexOf('</header>');
  if (headerStart !== -1 && headerEnd !== -1) {
    html = html.substring(0, headerStart) + generateHeader(p.route) + html.substring(headerEnd + 9);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated standalone header in ${p.file}`);
  }
});

// Also create public/project.html as alias to overview
fs.writeFileSync('public/project.html', overviewPage, 'utf8');
console.log('Created public/project.html');

console.log('ALL PAGES SUCCESSFULLY SEPARATED!');
