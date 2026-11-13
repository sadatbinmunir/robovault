import fs from 'fs';

// 1. Update contact.html
const contactPath = 'public/contact.html';
let contactContent = fs.readFileSync(contactPath, 'utf8');

const targetBtn = '<span>TRANSMIT TELEMETRY PACKET</span>';
const replBtn = '<span>SEND MESSAGE</span>';

if (contactContent.includes(targetBtn)) {
  contactContent = contactContent.replace(targetBtn, replBtn);
  fs.writeFileSync(contactPath, contactContent, 'utf8');
  console.log('Successfully updated contact.html button to SEND MESSAGE');
} else {
  console.error('Target button text not found in contact.html');
  process.exit(1);
}

// 2. Update main.js loading state
const mainJsPath = 'public/js/main.js';
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

const targetLoading = 'TRANSMITTING ENCRYPTED PACKET...';
const replLoading = 'SENDING MESSAGE...';

if (mainJsContent.includes(targetLoading)) {
  mainJsContent = mainJsContent.replace(targetLoading, replLoading);
  fs.writeFileSync(mainJsPath, mainJsContent, 'utf8');
  console.log('Successfully updated main.js loading text to SENDING MESSAGE...');
}
