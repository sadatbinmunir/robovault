import fs from 'fs';
const lines = fs.readFileSync('C:/Users/user/.gemini/antigravity/brain/e4860c27-6058-46a1-9abf-994ef2c18f34/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');
for (let i = 0; i < lines.length; i++) {
  const obj = JSON.parse(lines[i]);
  if (obj.step_index >= 3445 && obj.step_index <= 3491) {
    if (obj.source === 'MODEL' && obj.type === 'PLANNER_RESPONSE') {
      console.log(`Step ${obj.step_index}: output_tokens=${obj.output_tokens}, tools=${obj.tool_calls ? obj.tool_calls.map(t => t.name) : 'none'}`);
      if (obj.content) console.log('  Content:', obj.content.slice(0, 100));
    }
  }
}
