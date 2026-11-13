import fs from 'fs';
import path from 'path';

const htmlFiles = [
  'overview.html',
  'team.html',
  'literature.html',
  'timeline.html',
  'roadmap.html',
  'architecture.html',
  'schematics.html',
  'survey.html',
  'about.html',
  'contact.html',
  'project.html'
];

const unifiedFooterHtml = `  <!-- ==========================================================================
     UNIFIED GLOBAL SITE FOOTER (MATCHING 1:1 ACROSS ALL PAGES)
     ========================================================================== -->
  <footer class="site-footer" id="siteFooter">
    <div class="container footer-container">
      
      <!-- Main 4-Column Grid -->
      <div class="footer-top-grid">
        
        <!-- Col 1: Brand & Research Mission -->
        <div class="footer-col-brand">
          <a href="/" class="footer-brand-link">
            <span class="brand-text-white">Focusbot</span><span class="brand-text-gradient">.Ai</span>
          </a>
          <p class="footer-desc">
            An embodied AI desk companion combining low-latency edge computer vision and Google Gemini multimodal reasoning to eliminate distraction loops and sustain deep focus.
          </p>
          <div class="footer-telemetry-badge">
            <span class="telemetry-pulse-dot"></span>
            <span>CCDS HCI WING // INDEPENDENT UNIVERSITY, BANGLADESH</span>
          </div>
        </div>

        <!-- Col 2: System & Build -->
        <div class="footer-col-nav">
          <h4 class="footer-col-heading">SYSTEM &amp; BUILD</h4>
          <ul class="footer-nav-list">
            <li><a href="/overview">Project Overview</a></li>
            <li><a href="/architecture">Architecture &amp; Schematics</a></li>
            <li><a href="/roadmap">System Roadmap</a></li>
            <li><a href="/timeline">Development Timeline</a></li>
          </ul>
        </div>

        <!-- Col 3: Research & Team -->
        <div class="footer-col-nav">
          <h4 class="footer-col-heading">RESEARCH &amp; TEAM</h4>
          <ul class="footer-nav-list">
            <li><a href="/team">Faculty &amp; Engineering Team</a></li>
            <li><a href="/literature">Literature Reviews &amp; Paper</a></li>
            <li><a href="/survey">HRI User Study Survey</a></li>
            <li><a href="/about">About FocusBot</a></li>
          </ul>
        </div>

        <!-- Col 4: Contact & Lab -->
        <div class="footer-col-nav">
          <h4 class="footer-col-heading">CONTACT &amp; LAB</h4>
          <p class="footer-contact-caption">
            Academic evaluations, HCI research collaborations &amp; queries:
          </p>
          <a href="mailto:shidujaman@iub.edu.bd" class="footer-email-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>shidujaman@iub.edu.bd</span>
          </a>
          <div class="footer-privacy-tag">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span>Zero raw video logged • Edge privacy</span>
          </div>
        </div>

      </div>

      <!-- Bottom Bar: Copyright & Return to Top -->
      <div class="footer-bottom-row">
        <p class="footer-copy-text">
          &copy; 2026 FocusBot Embodied Robotics. Center for Computational &amp; Data-Sciences (CCDS). All rights reserved.
        </p>

        <a href="#" class="footer-back-to-top" aria-label="Return to top" onclick="window.scrollTo({top:0, behavior:'smooth'}); return false;">
          <span>RETURN TO TOP</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </a>
      </div>

    </div>
  </footer>`;

for (const file of htmlFiles) {
  const filePath = path.join('public', file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove the top-right header-nav-wrapper / pages dropdown wrapper
  const navWrapperStart = content.indexOf('<div class="header-nav-wrapper" id="pagesNavDropdownWrapper">');
  if (navWrapperStart !== -1) {
    // Find matching closing div for this wrapper before </header>
    const headerEnd = content.indexOf('</header>', navWrapperStart);
    if (headerEnd !== -1) {
      // Find the last </div> before </header>
      const lastDiv = content.lastIndexOf('</div>', headerEnd);
      if (lastDiv > navWrapperStart) {
        content = content.slice(0, navWrapperStart) + content.slice(lastDiv + 6);
        console.log(`[${file}] Removed header-nav-wrapper`);
      }
    }
  }

  // Also remove any comment like "<!-- Top Right: "Pages" Dropdown & Minimalist Circle Exit Button -->"
  content = content.replace(/<!-- Top Right: "Pages" Dropdown & Minimalist Circle Exit Button -->\s*/g, '');

  // 2. Replace the footer with unifiedFooterHtml
  const footerStart = content.indexOf('<footer class="site-footer"');
  if (footerStart !== -1) {
    const footerEnd = content.indexOf('</footer>', footerStart);
    if (footerEnd !== -1) {
      content = content.slice(0, footerStart) + unifiedFooterHtml + content.slice(footerEnd + 9);
      console.log(`[${file}] Replaced footer with unified footer`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('All HTML files updated successfully!');
