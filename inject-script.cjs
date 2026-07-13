const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'dist', 'client', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

const assetsDir = path.join(__dirname, 'dist', 'client', 'assets');
const files = fs.readdirSync(assetsDir);
const indexJs = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
const cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));

if (!html.includes('script type="module"')) {
  let injected = '';
  if (cssFile) injected += `<link rel="stylesheet" href="/assets/${cssFile}">\n`;
  if (indexJs) injected += `<script type="module" src="/assets/${indexJs}"></script>`;
  html = html.replace('</body>', injected + '</body>');
  fs.writeFileSync(htmlPath, html);
  console.log('Injected:', indexJs, cssFile);
} else {
  console.log('Already injected');
}
