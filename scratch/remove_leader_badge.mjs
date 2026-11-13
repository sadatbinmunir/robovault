import fs from 'fs';

const filePath = 'public/team.html';
let content = fs.readFileSync(filePath, 'utf8');

// Section 2: PROJECT LEADERS
// Match:
// <div class="section-header" style="margin-bottom: 2.5rem;">
//   <span class="section-tag" ...>[ 02 &mdash; CO-PROJECT LEADERSHIP &amp; ARCHITECTS ]</span>
//   <h2 class="section-title" style="letter-spacing: 0.04em;">PROJECT LEADERS</h2>
//   <p class="section-subtitle">
//     Leading project architecture, computational intelligence, hardware kinematics, and academic literature synthesis.
//   </p>
// </div>

const sec2Regex = /<div class="section-header"[^>]*>[\s\S]*?<span class="section-tag"[^>]*>\[\s*02[\s\S]*?<\/span>[\s\S]*?<h2 class="section-title"[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<p class="section-subtitle">[\s\S]*?<\/p>[\s\S]*?<\/div>/;

if (!sec2Regex.test(content)) {
  console.error('Could not match Section 2 header in team.html');
  process.exit(1);
}

content = content.replace(sec2Regex, `<div class="section-header" style="margin-bottom: 2.5rem;">
          <h2 class="section-title" style="letter-spacing: 0.04em;">PROJECT LEADERS</h2>
        </div>`);
console.log('Successfully removed Section 2 badge and subtitle.');

// Section 3: PROJECT RESEARCH MEMBERS
// Match:
// <div class="section-header" style="margin-bottom: 2.5rem;">
//   <span class="section-tag">[ 03 &mdash; ENGINEERING &amp; RESEARCH SQUAD ]</span>
//   <h2 class="section-title">PROJECT RESEARCH MEMBERS</h2>
//   <p class="section-subtitle">
//     Undergraduate researchers developing computer vision edge pipelines, embedded hardware firmware, and mechanical chassis fabrication.
//   </p>
// </div>

const sec3Regex = /<div class="section-header"[^>]*>[\s\S]*?<span class="section-tag"[^>]*>\[\s*03[\s\S]*?<\/span>[\s\S]*?<h2 class="section-title"[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<p class="section-subtitle">[\s\S]*?<\/p>[\s\S]*?<\/div>/;

if (sec3Regex.test(content)) {
  content = content.replace(sec3Regex, `<div class="section-header" style="margin-bottom: 2.5rem;">
          <h2 class="section-title">PROJECT RESEARCH MEMBERS</h2>
        </div>`);
  console.log('Successfully removed Section 3 badge and subtitle for full consistency.');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Saved public/team.html');
