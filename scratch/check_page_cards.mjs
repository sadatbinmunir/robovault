import fs from 'fs';

const files = [
  'overview.html',
  'team.html',
  'literature.html',
  'timeline.html',
  'roadmap.html',
  'architecture.html',
  'survey.html',
  'about.html',
  'contact.html'
];

for (const f of files) {
  const html = fs.readFileSync('public/' + f, 'utf8');
  const matches = html.match(/class="([^"]*(?:card|box|panel|phase|stat|layer)[^"]*)"/g) || [];
  const classes = matches.map(m => m.replace(/class="|"/g, ''));
  const splitClasses = new Set();
  classes.forEach(c => c.split(/\s+/).forEach(token => {
    if (token.includes('card') || token.includes('box') || token.includes('panel') || token.includes('phase')) {
      splitClasses.add(token);
    }
  }));
  console.log(`${f}: ${Array.from(splitClasses).join(', ')}`);
}
