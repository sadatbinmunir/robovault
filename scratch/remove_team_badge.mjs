import fs from 'fs';

const filePath = 'public/team.html';
let content = fs.readFileSync(filePath, 'utf8');

// The block to replace:
// <span class="section-tag">[ 04 — FACULTY SUPERVISION &amp; RESEARCH PERSONNEL ]</span>
// and
// <p class="section-subtitle">
//   Academic guidance, Human-Computer Interaction research wing affiliation, and undergraduate engineering developers driving the FocusBot project.
// </p>

const oldBlockRegex = /<div class="section-header"[^>]*>[\s\S]*?<span class="section-tag">\[ 04[^\n]*?<\/span>[\s\S]*?<h1 class="section-title"[^>]*>([\s\S]*?)<\/h1>[\s\S]*?<p class="section-subtitle">[\s\S]*?<\/p>[\s\S]*?<\/div>/;

const match = content.match(oldBlockRegex);
if (!match) {
  console.error('Could not match section-header block in team.html');
  process.exit(1);
}

console.log('Found match! Replacing with clean h1 title...');
const titleText = match[1].trim();

const newBlock = `<div class="section-header" style="margin-bottom: 2.5rem;">
        <h1 class="section-title" style="font-size: clamp(2rem, 3.5vw, 3rem); text-transform: uppercase;">
          ${titleText}
        </h1>
      </div>`;

content = content.replace(oldBlockRegex, newBlock);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated public/team.html');
