import fs from 'fs';

const filePath = 'public/team.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Section 1 tag and subtitle
const target1 = `        <span class="section-tag">[ 04 — FACULTY SUPERVISION &amp; RESEARCH PERSONNEL ]</span>
        <h1 class="section-title" style="font-size: clamp(2rem, 3.5vw, 3rem); text-transform: uppercase;">
          PROJECT LEADERSHIP &amp; TEAM
        </h1>
        <p class="section-subtitle">
          Academic guidance, Human-Computer Interaction research wing affiliation, and undergraduate engineering developers driving the FocusBot project.
        </p>`;

const replace1 = `        <h1 class="section-title" style="font-size: clamp(2rem, 3.5vw, 3rem); text-transform: uppercase;">
          PROJECT LEADERSHIP &amp; TEAM
        </h1>`;

if (!content.includes(target1)) {
  console.error('Target 1 not found in team.html!');
} else {
  content = content.replace(target1, replace1);
  console.log('Target 1 successfully replaced.');
}

// 2. Remove Section 2 tag and subtitle (PROJECT LEADERS)
const target2 = `          <span class="section-tag" style="border-color: rgba(255, 30, 75, 0.45); color: #FF3B68; background: rgba(255, 20, 60, 0.08);">[ 02 &mdash; CO-PROJECT LEADERSHIP &amp; ARCHITECTS ]</span>
          <h2 class="section-title" style="letter-spacing: 0.04em;">PROJECT LEADERS</h2>
          <p class="section-subtitle">
            Leading project architecture, computational intelligence, hardware kinematics, and academic literature synthesis.
          </p>`;

const replace2 = `          <h2 class="section-title" style="letter-spacing: 0.04em;">PROJECT LEADERS</h2>`;

if (!content.includes(target2)) {
  console.error('Target 2 not found in team.html!');
} else {
  content = content.replace(target2, replace2);
  console.log('Target 2 successfully replaced.');
}

// 3. Remove Section 3 tag and subtitle (PROJECT RESEARCH MEMBERS)
const target3 = `          <span class="section-tag">[ 03 &mdash; ENGINEERING &amp; RESEARCH SQUAD ]</span>
          <h2 class="section-title">PROJECT RESEARCH MEMBERS</h2>
          <p class="section-subtitle">
            Undergraduate researchers developing computer vision edge pipelines, embedded hardware firmware, and mechanical chassis fabrication.
          </p>`;

const replace3 = `          <h2 class="section-title">PROJECT RESEARCH MEMBERS</h2>`;

if (!content.includes(target3)) {
  console.error('Target 3 not found in team.html!');
} else {
  content = content.replace(target3, replace3);
  console.log('Target 3 successfully replaced.');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated public/team.html successfully.');
