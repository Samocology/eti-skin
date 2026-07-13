import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const STATIC_DIR = join(__dirname, 'dist', 'client')
const MIME_TYPES = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

async function start() {
  const mod = await import('./dist/server/server.js')
  const handler = mod.default || mod

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', 'http://localhost')
      const pathname = decodeURIComponent(url.pathname)

      if (req.method === 'GET' || req.method === 'HEAD') {
        const filePath = join(STATIC_DIR, pathname)
        try {
          const content = await readFile(filePath)
          const ext = extname(filePath)
          const contentType = MIME_TYPES[ext] || 'application/octet-stream'
          res.writeHead(200, { 'Content-Type': contentType })
          res.end(content)
          return
        } catch {
          // not a static file, fall through to handler
        }
      }

      const response = await handler.fetch(new Request(url, {
        method: req.method,
        headers: req.headers,
      }))

      res.writeHead(response.status, Object.fromEntries(response.headers))
      const body = await response.text()
      res.end(body)
    } catch (e) {
      res.writeHead(500)
      res.end('Error')
    }
  })

  const port = process.env.PORT || 3000
  server.listen(port, () => console.log('Server running on port ' + port))
}

start()
