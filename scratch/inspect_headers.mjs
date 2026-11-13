import fs from 'fs';

const content = fs.readFileSync('public/team.html', 'utf8');
const regex = /<div class="section-header"[\s\S]*?<\/div>/g;
let m;
let i = 1;
while ((m = regex.exec(content)) !== null) {
  console.log(`--- SECTION HEADER ${i++} ---`);
  console.log(m[0]);
}
