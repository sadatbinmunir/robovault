import fs from 'fs';
import path from 'path';

const newHeaderTemplate = (currentPath) => `  <!-- ==========================================================================
       TOP FLOATING EDITORIAL NAVBAR WITH HORIZONTAL SIDE-SCROLL (MATCHING 1:1 ACROSS ALL PAGES)
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
      
      <!-- Left Scroll Chevron Button -->
      <button type="button" class="rail-scroll-arrow rail-arrow-left" id="railScrollLeftBtn" aria-label="Scroll options left">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <!-- Scrollable Options Container -->
      <nav class="quick-nav-scroll-container" id="quickNavScrollContainer" aria-label="All Pages Navigation">
        <a href="/" class="nav-rail-item ${currentPath === '/' ? 'active' : ''}">Home</a>
        <a href="/team" class="nav-rail-item ${currentPath === '/team' ? 'active' : ''}">Team &amp; Faculty</a>
        <a href="/timeline" class="nav-rail-item ${currentPath === '/timeline' ? 'active' : ''}">Timeline</a>
        <a href="/roadmap" class="nav-rail-item ${currentPath === '/roadmap' ? 'active' : ''}">Roadmap</a>
        <a href="/project#hardware-schematics" class="nav-rail-item ${currentPath === '/project#hardware-schematics' ? 'active' : ''}">Schematics</a>
        <a href="/project#software-architecture" class="nav-rail-item ${currentPath === '/project#software-architecture' ? 'active' : ''}">Architecture</a>
        <a href="/project" class="nav-rail-item ${currentPath === '/project' ? 'active' : ''}">Overview</a>
        <a href="/team#literature-review" class="nav-rail-item">Literature</a>
        <a href="/survey" class="nav-rail-item ${currentPath === '/survey' ? 'active' : ''}">Survey</a>
        <a href="/about" class="nav-rail-item ${currentPath === '/about' ? 'active' : ''}">About</a>
        <a href="/contact" class="nav-rail-item ${currentPath === '/contact' ? 'active' : ''}">Contact</a>
      </nav>

      <!-- Right Scroll Chevron Button -->
      <button type="button" class="rail-scroll-arrow rail-arrow-right" id="railScrollRightBtn" aria-label="Scroll options right">
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
        
        <!-- Header info bar -->
        <div class="dropdown-header-bar">
          <span class="dropdown-section-title">PROJECT DIRECTORY</span>
          <span class="dropdown-dept-title">CCDS HCI WING</span>
        </div>

        <!-- List of Pages -->
        <div class="dropdown-links-list">
          
          <a href="/team" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(99, 102, 241, 0.2)); color: #C084FC;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline">
                <span class="dropdown-item-title">Team &amp; Faculty</span>
                <span class="dropdown-item-tag">SUPERVISION</span>
              </div>
              <p class="dropdown-item-desc">Faculty supervisor &amp; research engineers</p>
            </div>
          </a>

          <a href="/timeline" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2)); color: #22D3EE;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline">
                <span class="dropdown-item-title">Project Timeline</span>
                <span class="dropdown-item-tag">SPRINTS</span>
              </div>
              <p class="dropdown-item-desc">Weekly milestones, specs &amp; video logs</p>
            </div>
          </a>

          <a href="/roadmap" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.2)); color: #FB923C;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline">
                <span class="dropdown-item-title">System Roadmap</span>
                <span class="dropdown-item-tag">HORIZONS</span>
              </div>
              <p class="dropdown-item-desc">Hardware trajectory &amp; neural expansion</p>
            </div>
          </a>

          <a href="/project" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2)); color: #34D399;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline">
                <span class="dropdown-item-title">Project Schematics</span>
                <span class="dropdown-item-tag">HARDWARE</span>
              </div>
              <p class="dropdown-item-desc">Circuit pinouts, BOM &amp; paper draft</p>
            </div>
          </a>

          <a href="/survey" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(244, 63, 94, 0.2)); color: #F472B6;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><polyline points="9 14 12 17 17 12"></polyline></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline">
                <span class="dropdown-item-title">HRI Study Survey</span>
                <span class="dropdown-item-tag">RESEARCH</span>
              </div>
              <p class="dropdown-item-desc">Desk companion user study questionnaire</p>
            </div>
          </a>

          <a href="/about" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2)); color: #A78BFA;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline">
                <span class="dropdown-item-title">About FocusBot</span>
                <span class="dropdown-item-tag">MISSION</span>
              </div>
              <p class="dropdown-item-desc">Core tenets, privacy &amp; lab affiliation</p>
            </div>
          </a>

          <a href="/contact" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(113, 113, 122, 0.2), rgba(148, 163, 184, 0.2)); color: #D4D4D8;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline">
                <span class="dropdown-item-title">Contact Channels</span>
                <span class="dropdown-item-tag">INQUIRIES</span>
              </div>
              <p class="dropdown-item-desc">Direct email &amp; lab location</p>
            </div>
          </a>

        </div>

        <!-- Footer with return to 3D home button -->
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

const pageMap = {
  'team.html': '/team',
  'timeline.html': '/timeline',
  'roadmap.html': '/roadmap',
  'project.html': '/project',
  'overview.html': '/overview',
  'about.html': '/about',
  'survey.html': '/survey',
  'contact.html': '/contact'
};

Object.entries(pageMap).forEach(([fileName, routePath]) => {
  const p = path.join('public', fileName);
  let html = fs.readFileSync(p, 'utf8');
  
  const startIdx = html.indexOf('<header');
  const endIdx = html.indexOf('</header>');
  
  if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + newHeaderTemplate(routePath) + html.substring(endIdx + 9);
    fs.writeFileSync(p, html, 'utf8');
    console.log('Successfully updated side-scroll header in', fileName);
  } else {
    console.warn('Could not find header in', fileName);
  }
});
