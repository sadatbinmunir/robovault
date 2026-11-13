import fs from 'fs';

const pages = [
  'public/overview.html',
  'public/team.html',
  'public/literature.html',
  'public/roadmap.html',
  'public/architecture.html',
  'public/survey.html',
  'public/about.html',
  'public/contact.html'
];

for (const p of pages) {
  if (fs.existsSync(p)) {
    const text = fs.readFileSync(p, 'utf8');
    const matches = text.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    console.log(p, matches);
  }
}
