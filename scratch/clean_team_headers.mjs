import fs from 'fs';

const filePath = 'public/team.html';
const raw = fs.readFileSync(filePath, 'utf8');
const isCRLF = raw.includes('\r\n');
const lines = raw.split(/\r?\n/);

console.log('Total lines:', lines.length);

// We want to remove:
// 1) Section 1:
//    - <span class="section-tag">[ 04 — FACULTY SUPERVISION &amp; RESEARCH PERSONNEL ]</span>
//    - <p class="section-subtitle">... Academic guidance ... </p>
// 2) Section 2:
//    - <span class="section-tag"...>[ 02 &mdash; CO-PROJECT LEADERSHIP &amp; ARCHITECTS ]</span>
//    - <p class="section-subtitle">... Leading project architecture ... </p>
// 3) Section 3:
//    - <span class="section-tag">[ 03 &mdash; ENGINEERING &amp; RESEARCH SQUAD ]</span>
//    - <p class="section-subtitle">... Undergraduate researchers developing ... </p>

const newLines = [];
let skipUntilPClosing = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Check if line contains one of the tags to remove
  if (
    line.includes('[ 04') && line.includes('FACULTY SUPERVISION') ||
    line.includes('[ 02') && line.includes('CO-PROJECT LEADERSHIP') ||
    line.includes('[ 03') && line.includes('ENGINEERING &amp; RESEARCH SQUAD')
  ) {
    console.log(`Removing tag at line ${i}: ${line.trim()}`);
    continue;
  }

  // Check if line starts subtitle paragraph to remove
  if (
    line.includes('class="section-subtitle"') &&
    (
      lines[i + 1]?.includes('Academic guidance') ||
      lines[i + 1]?.includes('Leading project architecture') ||
      lines[i + 1]?.includes('Undergraduate researchers developing') ||
      line.includes('Academic guidance') ||
      line.includes('Leading project architecture') ||
      line.includes('Undergraduate researchers developing')
    )
  ) {
    console.log(`Removing subtitle start at line ${i}: ${line.trim()}`);
    if (!line.includes('</p>')) {
      skipUntilPClosing = true;
    }
    continue;
  }

  if (skipUntilPClosing) {
    console.log(`Skipping subtitle body at line ${i}: ${line.trim()}`);
    if (line.includes('</p>')) {
      skipUntilPClosing = false;
    }
    continue;
  }

  newLines.push(line);
}

const delim = isCRLF ? '\r\n' : '\n';
fs.writeFileSync(filePath, newLines.join(delim), 'utf8');
console.log('Successfully written updated public/team.html with clean headers!');
