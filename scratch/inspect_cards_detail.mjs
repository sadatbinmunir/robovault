import fs from 'fs';

const pages = ['overview.html', 'team.html', 'literature.html', 'timeline.html', 'roadmap.html', 'architecture.html', 'survey.html', 'about.html', 'contact.html'];

for (const p of pages) {
  const html = fs.readFileSync('public/' + p, 'utf8');
  console.log(`\n=== ${p} ===`);
  const cardMatches = html.match(/class="([^"]*(?:hud-card|card|box|phase|post|spec)[^"]*)"/g) || [];
  const unique = [...new Set(cardMatches.map(m => m.replace(/class="|"/g, '')))];
  unique.slice(0, 8).forEach(c => console.log('  • ' + c));
}
