import { createServer } from 'http'
import { readFileSync } from 'fs'
import { join } from 'path'

export default async function handler(req, res) {
  const html = readFileSync(join(process.cwd(), 'dist/client/index.html'), 'utf-8')
  res.setHeader('Content-Type', 'text/html')
  res.send(html)
}
