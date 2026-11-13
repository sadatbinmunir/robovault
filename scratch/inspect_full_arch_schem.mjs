import fs from 'fs';

const archHtml = fs.readFileSync('public/architecture.html', 'utf8');
const schemHtml = fs.readFileSync('public/schematics.html', 'utf8');

const extractMain = (html) => {
  const m = html.match(/<main[\s\S]*?<\/main>/);
  return m ? m[0] : '';
};

console.log('Arch main:');
console.log(extractMain(archHtml));

console.log('\n=========================================\nSchem main:');
console.log(extractMain(schemHtml));
