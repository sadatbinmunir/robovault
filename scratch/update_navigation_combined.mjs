import fs from 'fs';
import path from 'path';

// 1. Update components/Navbar.tsx
const navbarPath = 'components/Navbar.tsx';
let navbarContent = fs.readFileSync(navbarPath, 'utf8');

// Replace in allSelectablePages:
navbarContent = navbarContent.replace(
  /\{\s*label:\s*"Architecture",\s*href:\s*"\/architecture"\s*\},\s*\{\s*label:\s*"Schematics",\s*href:\s*"\/schematics"\s*\},/,
  '{ label: "Architecture & Schematics", href: "/architecture" },'
);

// Replace in navPages:
const oldArchSchemNavPages = `  {
    name: "System Architecture",
    href: "/architecture",
    icon: Layers,
    tag: "PIPELINE",
    description: "ROS2, dual-core ESP32 & edge neural stack",
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400"
  },
  {
    name: "Hardware Schematics",
    href: "/schematics",
    icon: Cpu,
    tag: "HARDWARE",
    description: "Circuit pinouts, BOM matrix & PCB CAD",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400"
  },`;

const newArchSchemNavPages = `  {
    name: "Architecture & Schematics",
    href: "/architecture",
    icon: Cpu,
    tag: "SYSTEM & PINOUT",
    description: "Multi-tier intelligence pipeline, ESP32 pinouts & BoM",
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400"
  },`;

navbarContent = navbarContent.replace(oldArchSchemNavPages, newArchSchemNavPages);

// Update isActive check to also match /schematics
navbarContent = navbarContent.replace(
  'const isActive = pathname === page.href || (page.href !== "/" && pathname?.startsWith(page.href));',
  'const isActive = pathname === page.href || (page.href !== "/" && pathname?.startsWith(page.href)) || (page.href === "/architecture" && pathname === "/schematics");'
);

fs.writeFileSync(navbarPath, navbarContent, 'utf8');
console.log('Updated components/Navbar.tsx');

// 2. Update next.config.js
const nextConfigPath = 'next.config.js';
let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
nextConfigContent = nextConfigContent.replace(
  "{ source: '/schematics', destination: '/schematics.html' },",
  "{ source: '/schematics', destination: '/architecture.html' },"
);
fs.writeFileSync(nextConfigPath, nextConfigContent, 'utf8');
console.log('Updated next.config.js');

// 3. Update all public/*.html files
const htmlFiles = [
  'about.html',
  'architecture.html',
  'contact.html',
  'literature.html',
  'overview.html',
  'project.html',
  'roadmap.html',
  'schematics.html',
  'survey.html',
  'team.html',
  'timeline.html'
];

for (const file of htmlFiles) {
  const filePath = path.join('public', file);
  if (!fs.existsSync(filePath)) continue;

  let html = fs.readFileSync(filePath, 'utf8');
  const isArchOrSchem = (file === 'architecture.html' || file === 'schematics.html');

  // Regex to match the two nav rail items Architecture and Schematics
  const navRailRegex = /<a href="\/architecture" class="nav-rail-item\s*([^"]*)">Architecture<\/a>\s*<a href="\/schematics" class="nav-rail-item\s*([^"]*)">Schematics<\/a>/;

  const activeClass = isArchOrSchem ? 'active' : '';
  const newRailItem = `<a href="/architecture" class="nav-rail-item ${activeClass}">Architecture &amp; Schematics</a>`;

  if (navRailRegex.test(html)) {
    html = html.replace(navRailRegex, newRailItem);
    console.log(`Updated nav rail in ${file}`);
  } else {
    console.warn(`Could not match nav rail in ${file}`);
  }

  // Regex to match both Architecture and Schematics dropdown items
  const dropdownRegex = /<a href="\/architecture" class="dropdown-page-item">[\s\S]*?<\/a>\s*<a href="\/schematics" class="dropdown-page-item">[\s\S]*?<\/a>/;

  const newDropdownItem = `<a href="/architecture" class="dropdown-page-item">
            <div class="dropdown-icon-box" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2)); color: #A78BFA;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <div class="dropdown-item-details">
              <div class="dropdown-item-headline"><span class="dropdown-item-title">Architecture &amp; Schematics</span><span class="dropdown-item-tag">SYSTEM &amp; PINOUT</span></div>
              <p class="dropdown-item-desc">Multi-tier intelligence stack, ESP32-S3 pinouts &amp; BoM</p>
            </div>
          </a>`;

  if (dropdownRegex.test(html)) {
    html = html.replace(dropdownRegex, newDropdownItem);
    console.log(`Updated dropdown in ${file}`);
  } else {
    console.warn(`Could not match dropdown in ${file}`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
}

console.log('All updates finished successfully.');
