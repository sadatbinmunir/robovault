const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Remove existing dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy files and folders
function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

// Copy static assets
console.log('Building FocusBot for production...');
fs.readdirSync(__dirname).forEach(file => {
  if (file.endsWith('.html')) {
    fs.copyFileSync(path.join(__dirname, file), path.join(distDir, file));
  }
});
copyFolderSync(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));
copyFolderSync(path.join(__dirname, 'css'), path.join(distDir, 'css'));
copyFolderSync(path.join(__dirname, 'js'), path.join(distDir, 'js'));

console.log('Build completed successfully into dist/');
