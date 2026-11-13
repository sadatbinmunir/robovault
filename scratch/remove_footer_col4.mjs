import fs from 'fs';
import path from 'path';

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const targetCol4CRLF = `        <!-- Col 4: Contact & Lab -->\r\n        <div class="footer-col-nav">\r\n          <h4 class="footer-col-heading">CONTACT &amp; LAB</h4>\r\n          <p class="footer-contact-caption">\r\n            Academic evaluations, HCI research collaborations &amp; queries:\r\n          </p>\r\n          <a href="mailto:shidujaman@iub.edu.bd" class="footer-email-pill">\r\n            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>\r\n            <span>shidujaman@iub.edu.bd</span>\r\n          </a>\r\n          <div class="footer-privacy-tag">\r\n            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>\r\n            <span>Zero raw video logged • Edge privacy</span>\r\n          </div>\r\n        </div>`;

const targetCol4LF = targetCol4CRLF.replace(/\r\n/g, '\n');

const col3TargetCRLF = `            <li><a href="/about">About FocusBot</a></li>\r\n          </ul>`;
const col3ReplCRLF = `            <li><a href="/about">About FocusBot</a></li>\r\n            <li><a href="/contact">Contact Research Team</a></li>\r\n          </ul>`;

const col3TargetLF = `            <li><a href="/about">About FocusBot</a></li>\n          </ul>`;
const col3ReplLF = `            <li><a href="/about">About FocusBot</a></li>\n            <li><a href="/contact">Contact Research Team</a></li>\n          </ul>`;

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  if (content.includes(targetCol4CRLF)) {
    content = content.replace(targetCol4CRLF + '\r\n', '');
    modified = true;
  } else if (content.includes(targetCol4LF)) {
    content = content.replace(targetCol4LF + '\n', '');
    modified = true;
  }

  if (content.includes(col3TargetCRLF)) {
    content = content.replace(col3TargetCRLF, col3ReplCRLF);
    modified = true;
  } else if (content.includes(col3TargetLF)) {
    content = content.replace(col3TargetLF, col3ReplLF);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated footer in: ${file}`);
  }
}

console.log(`Total HTML files updated: ${updatedCount}`);
