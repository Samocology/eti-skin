import { createServer } from 'http'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = process.env.PORT || 3000

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
}

function serveStatic(url: string) {
  const filePath = url === '/' 
    ? join(__dirname, '../client/index.html')
    : join(__dirname, '../client', url)
  
  try {
    const content = readFileSync(filePath)
    const ext = '.' + filePath.split('.').pop()
    return { content, type: MIME[ext] || 'application/octet-stream' }
  } catch {
    return null
  }
}

const server = createServer((req, res) => {
  const url = req.url || '/'
  
  const file = serveStatic(url)
  if (file) {
    res.writeHead(200, { 'Content-Type': file.type })
    res.end(file.content)
    return
  }

  // SPA fallback for client-side routing
  const html = serveStatic('/')
  if (html) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html.content)
  } else {
    res.writeHead(500)
    res.end('Server Error')
  }
})

server.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})
