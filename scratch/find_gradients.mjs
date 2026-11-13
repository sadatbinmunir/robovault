import fs from 'fs';

function findGradients(filePath) {
  if (fs.existsSync(filePath)) {
    const text = fs.readFileSync(filePath, 'utf8');
    const matches = text.match(/(bg-clip-text[^\n"]*|text-gradient[^\n"]*|gradient[^\n"]*)/gi) || [];
    console.log(filePath, matches.slice(0, 5));
  }
}

findGradients('components/Hero.tsx');
findGradients('components/BentoGridSection.tsx');
findGradients('public/css/styles.css');
