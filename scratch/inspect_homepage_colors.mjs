import fs from 'fs';

const page = fs.readFileSync('app/page.tsx', 'utf8');
const bento = fs.readFileSync('components/BentoGridSection.tsx', 'utf8');

const getColors = (code) => {
  const bgs = code.match(/bg-[a-zA-Z0-9\/\.\[\]_-]+/g) || [];
  const borders = code.match(/border-[a-zA-Z0-9\/\.\[\]_-]+/g) || [];
  const texts = code.match(/text-[a-zA-Z0-9\/\.\[\]_-]+/g) || [];
  return {
    bgs: [...new Set(bgs)],
    borders: [...new Set(borders)],
    texts: [...new Set(texts)]
  };
};

console.log('BENTO SECTION:');
console.log(JSON.stringify(getColors(bento), null, 2));
