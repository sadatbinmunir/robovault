import fs from 'fs';

const teamHtml = fs.readFileSync('C:/Users/user/Desktop/robo project extract from here/team.html', 'utf8');

console.log('Main blocks in team.html:');
const matches = teamHtml.match(/<!-- =+[\s\S]*?=+ -->/g);
if (matches) {
  matches.forEach(m => {
    console.log(m.replace(/<!-- =+/g, '').replace(/=+ -->/g, '').trim().split('\n')[0]);
  });
}
