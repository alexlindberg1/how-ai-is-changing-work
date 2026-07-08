import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import type { Plugin } from 'vite'

const VALID_KEYS = new Set(['dataAnalysis', 'proposal'])

/** Dev-only endpoint that materializes a fresh Codex workspace before launch. */
export function codexPreparePlugin(): Plugin {
  return {
    name: 'codex-prepare',
    configureServer(server) {
      server.middlewares.use('/api/codex/prepare', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method not allowed')
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          try {
            const { demoKey } = JSON.parse(body) as { demoKey?: string }
            if (!demoKey || !VALID_KEYS.has(demoKey)) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'demoKey must be dataAnalysis or proposal' }))
              return
            }

            const script = join(process.cwd(), 'scripts/prepare-codex-run.mjs')
            const output = execFileSync('node', [script, demoKey], { encoding: 'utf8' }).trim()

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(output)
          } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
        })
      })
    },
  }
}
