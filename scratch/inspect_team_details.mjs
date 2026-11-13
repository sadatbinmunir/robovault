import fs from 'fs';

const content = fs.readFileSync('C:/Users/user/Desktop/robo project extract from here/team.html', 'utf8');
const lines = content.split('\n');

console.log('=== Lines 220-250 (Leader 1 start) ===');
console.log(lines.slice(220, 255).join('\n'));

console.log('=== Lines 615-645 (Three members start) ===');
console.log(lines.slice(615, 645).join('\n'));
