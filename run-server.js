import { createServer } from 'http'

async function start() {
  const mod = await import('./dist/server/server.js')
  const handler = mod.default || mod

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', 'http://localhost')
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
