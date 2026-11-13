const fs = require('fs');
const content = fs.readFileSync('C:/Users/user/.gemini/antigravity/brain/e4860c27-6058-46a1-9abf-994ef2c18f34/.system_generated/logs/transcript.jsonl', 'utf8');
const lines = content.trim().split('\n');
const userInputs = [];
for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT') {
      userInputs.push({ step_index: obj.step_index, content: obj.content, media: obj.media });
    }
  } catch(e) {}
}
console.log(JSON.stringify(userInputs.slice(-10), null, 2));
