import fs from 'fs';

const indexHtml = fs.readFileSync('C:/Users/user/Desktop/robo project extract from here/index.html', 'utf8');

function getSection(id) {
  const start = indexHtml.indexOf(`<section class="section-block" id="${id}">`);
  if (start === -1) return null;
  const end = indexHtml.indexOf('</section>', start);
  return indexHtml.substring(start, end + 10);
}

['overview', 'software-architecture', 'equipments', 'literature-review', 'paper-draft'].forEach(id => {
  const s = getSection(id);
  console.log(`=== ${id} === (length: ${s ? s.length : 0})`);
  if (s) {
    console.log(s.substring(0, 300));
    console.log('...\n');
  }
});
