import fs from 'fs';

const content = fs.readFileSync('C:/Users/user/Desktop/robo project extract from here/team.html', 'utf8');
const lines = content.split('\n');

console.log('Total lines in source team.html:', lines.length);

const targets = [
  'supervisor',
  'leader1',
  'leader2',
  'member1',
  'member2',
  'member3',
  'literature-review'
];

lines.forEach((l, i) => {
  targets.forEach(t => {
    if (l.includes(`id="${t}"`)) {
      console.log(`Line ${i+1}: Found id="${t}" -> ${l.trim().substring(0, 80)}`);
    }
  });
});
