import fs from 'fs';

// Read original source timeline.html
const rawTimeline = fs.readFileSync('C:/Users/user/Desktop/robo project extract from here/timeline.html', 'utf8');

// Read the unified header from roadmap.html (where timeline is one of the nav items)
const roadmapHtml = fs.readFileSync('public/roadmap.html', 'utf8');
const headerStart = roadmapHtml.indexOf('<header class="home-style-header">');
const headerEnd = roadmapHtml.indexOf('</header>', headerStart) + 9;
let unifiedHeader = roadmapHtml.slice(headerStart, headerEnd);

// Ensure Timeline is active in the rail
unifiedHeader = unifiedHeader.replace(
  '<a href="/roadmap" class="nav-rail-item active">Roadmap</a>',
  '<a href="/roadmap" class="nav-rail-item ">Roadmap</a>'
);
unifiedHeader = unifiedHeader.replace(
  '<a href="/timeline" class="nav-rail-item ">Timeline</a>',
  '<a href="/timeline" class="nav-rail-item active">Timeline</a>'
);

// In rawTimeline, replace css path 'css/styles.css' with '/css/styles.css'
let restored = rawTimeline.replace('href="css/styles.css"', 'href="/css/styles.css"');

// Replace header in rawTimeline with unifiedHeader
const rawHeaderStart = restored.indexOf('<header');
const rawHeaderEnd = restored.indexOf('</header>') + 9;
restored = restored.slice(0, rawHeaderStart) + unifiedHeader + restored.slice(rawHeaderEnd);

// Ensure scripts point to absolute path
restored = restored.replace('src="js/main.js"', 'src="/js/main.js"');

fs.writeFileSync('public/timeline.html', restored, 'utf8');
console.log('Successfully restored original timeline.html with unified header!');
