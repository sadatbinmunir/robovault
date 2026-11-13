import fs from 'fs';

const filePath = 'public/contact.html';
let content = fs.readFileSync(filePath, 'utf8');

const target = '        <span class="section-tag">[ ENCRYPTED COMMUNICATION CHANNEL ]</span>\r\n';
const targetLF = '        <span class="section-tag">[ ENCRYPTED COMMUNICATION CHANNEL ]</span>\n';

if (content.includes(target)) {
  content = content.replace(target, '');
} else if (content.includes(targetLF)) {
  content = content.replace(targetLF, '');
} else {
  console.error('Target not found!');
  process.exit(1);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully removed ENCRYPTED COMMUNICATION CHANNEL');
