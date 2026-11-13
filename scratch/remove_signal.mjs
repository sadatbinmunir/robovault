import fs from 'fs';

const filePath = 'public/contact.html';
let content = fs.readFileSync(filePath, 'utf8');

const target = '          <span class="card-index">SIGNAL TRANSMISSION</span>\r\n          <h4 style="margin: 1rem 0;';
const targetLF = '          <span class="card-index">SIGNAL TRANSMISSION</span>\n          <h4 style="margin: 1rem 0;';

if (content.includes(target)) {
  content = content.replace(target, '          <h4 style="margin: 0 0 1rem 0;');
} else if (content.includes(targetLF)) {
  content = content.replace(targetLF, '          <h4 style="margin: 0 0 1rem 0;');
} else {
  console.error('Target not found!');
  process.exit(1);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully removed SIGNAL TRANSMISSION');
