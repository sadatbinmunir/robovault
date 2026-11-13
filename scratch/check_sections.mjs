import fs from 'fs';
const html = fs.readFileSync('public/architecture.html', 'utf8');
const regex = /<(section|div)[^>]+class="([^"]*(?:track|sequence|explorer|table|container)[^"]*)"/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(`${m[1]} -> ${m[2]}`);
}
