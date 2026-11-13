import fs from 'fs';

const css = fs.readFileSync('public/css/timeline-liquid.css', 'utf8');
const js = fs.readFileSync('public/js/timeline-experience.js', 'utf8');
let html = fs.readFileSync('public/timeline.html', 'utf8');

// Replace stylesheet link with inline style
html = html.replace(
  '<link rel="stylesheet" href="/css/timeline-liquid.css">',
  `<style id="timelineLiquidStyles">\n${css}\n</style>`
);

// Replace timeline-experience.js script with inline script
html = html.replace(
  '<script src="/js/timeline-experience.js"></script>',
  `<script id="timelineExperienceScript">\n${js}\n</script>`
);

fs.writeFileSync('public/timeline.html', html, 'utf8');
console.log('Successfully bundled timeline HTML with inline style and script!');
