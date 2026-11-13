import fs from 'fs';

const bento = fs.readFileSync('components/BentoGridSection.tsx', 'utf8');
const model = fs.readFileSync('components/ModelCreatorSection.tsx', 'utf8');

const extractClasses = (txt) => {
  const matches = txt.match(/className="([^"]+)"/g) || [];
  return matches.map(m => m.replace(/className="|"/g, ''));
};

const bentoClasses = extractClasses(bento);
const modelClasses = extractClasses(model);

console.log('=== Bento Card & Glass Patterns ===');
bentoClasses.filter(c => c.includes('backdrop') || c.includes('rounded-') || c.includes('border-white')).slice(0, 15).forEach(c => console.log('• ' + c));

console.log('\n=== Model Studio Glass Patterns ===');
modelClasses.filter(c => c.includes('backdrop') || c.includes('rounded-') || c.includes('border-white')).slice(0, 15).forEach(c => console.log('• ' + c));
