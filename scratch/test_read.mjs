import fs from 'fs';

const dir = 'C:/Users/user/Desktop/robo project extract from here';
const indexHtml = fs.readFileSync(`${dir}/index.html`, 'utf8');
const teamHtml = fs.readFileSync(`${dir}/team.html`, 'utf8');

console.log('Index HTML length:', indexHtml.length);
console.log('Team HTML length:', teamHtml.length);
