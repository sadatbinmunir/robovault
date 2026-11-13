import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewsDir = path.resolve('previews');

// Let's test how it looks with:
// 1. Clean floating title (no card box, no phase tag, no desc)
// FocusBot (white) + Companion Architecture (theme gradient)
const testHtml = `
<div class="arch-hud-title-wrap" style="max-width: 650px;">
  <h1 style="font-family: var(--font-sans); font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; margin: 0;">
    <span style="color: #FFFFFF;">FocusBot</span> <span style="background: linear-gradient(135deg, #C084FC 0%, #A855F7 55%, #E9D5FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.45));">Companion Architecture</span>
  </h1>
</div>
`;
console.log(testHtml);
