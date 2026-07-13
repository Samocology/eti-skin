import { createServer } from 'http'
import { readFileSync, existsSync } from 'fs'
import { join, extname } from 'path'

const PORT = process.env.PORT || 3000

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

const server = createServer((req, res) => {
  const url = req.url || '/'
  
  // API routes
  if (url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }

  // Static files
  const filePath = url === '/' 
    ? join(__dirname, '../client/index.html')
    : join(__dirname, '../client', url)

  const ext = extname(filePath)
  const contentType = MIME[ext] || 'application/octet-stream'

  try {
    if (existsSync(filePath)) {
      const content = readFileSync(filePath)
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content)
    } else {
      // SPA fallback
      const html = readFileSync(join(__dirname, '../client/index.html'), 'utf-8')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(html)
    }
  } catch {
    res.writeHead(500)
    res.end('Server Error')
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
