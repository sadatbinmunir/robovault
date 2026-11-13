import fs from 'fs';

const dir = 'C:/Users/user/Desktop/robo project extract from here';
const indexHtml = fs.readFileSync(`${dir}/index.html`, 'utf8');

const sections = [];
const regex = /<section[^>]*id="([^"]+)"[^>]*>/g;
let match;
while ((match = regex.exec(indexHtml)) !== null) {
  sections.push({ id: match[1], index: match.index });
}

console.log('Sections in index.html:');
sections.forEach((s, i) => {
  const nextIndex = sections[i + 1] ? sections[i + 1].index : indexHtml.indexOf('</main>');
  console.log(`- ${s.id.padEnd(25)} (length: ${nextIndex - s.index} chars)`);
});
