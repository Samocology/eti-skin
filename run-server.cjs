const { createServer } = require('http');
const { readFileSync, existsSync } = require('fs');
const { join, extname } = require('path');

const STATIC_DIR = join(__dirname, 'dist', 'client');

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

async function start() {
  const mod = await import('./dist/server/server.js');
  const handler = mod.default || mod;

  const server = createServer(async (req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);

    // Try static files first
    const filePath = join(STATIC_DIR, pathname);
    if (existsSync(filePath)) {
      const ext = extname(filePath);
      const contentType = MIME[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(readFileSync(filePath));
      return;
    }

    // SSR fallback
    try {
      const response = await handler.fetch(new Request(url, {
        method: req.method,
        headers: req.headers,
      }));

      const headers = {};
      response.headers.forEach((v, k) => headers[k] = v);
      res.writeHead(response.status, headers);
      const body = await response.text();
      res.end(body);
    } catch (e) {
      // SPA fallback
      const html = join(STATIC_DIR, 'index.html');
      if (existsSync(html)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(html));
      } else {
        res.writeHead(500);
        res.end('Error');
      }
    }
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log('Server running on port ' + port));
}

start();
