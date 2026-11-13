import fs from 'fs';

const dir = 'C:/Users/user/Desktop/robo project extract from here';

['team.html', 'timeline.html', 'index.html'].forEach(file => {
  const content = fs.readFileSync(`${dir}/${file}`, 'utf8');
  console.log(`=== ${file} ===`);
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('<section') || l.includes('<main') || (l.includes('class="') && l.includes('header')) || l.includes('id=')) {
      if (l.trim().length > 0 && l.trim().length < 120) {
        console.log(`  Line ${i+1}: ${l.trim()}`);
      }
    }
  });
});
