/**
 * Creates a fresh Codex workspace for a live demo run.
 *
 * Usage: node scripts/prepare-codex-run.mjs dataAnalysis|proposal
 * Prints JSON: { runId, projectPath }
 */
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const demoKey = process.argv[2]

const configs = {
  dataAnalysis: {
    template: 'demo-templates/data-analysis',
    runSegment: 'data-analysis',
    source: ['public/demo/summit-plumbing-financials.xlsx', 'source/summit-plumbing-financials.xlsx'],
  },
  proposal: {
    template: 'demo-templates/proposal',
    runSegment: 'proposal',
    source: ['public/demo/summit-plumbing-proposal.pdf', 'source/summit-plumbing-proposal.pdf'],
  },
}

const cfg = configs[demoKey]
if (!cfg) {
  console.error(JSON.stringify({ error: `Unknown demoKey: ${demoKey}` }))
  process.exit(1)
}

const templatePath = join(root, cfg.template)
if (!existsSync(templatePath)) {
  console.error(JSON.stringify({ error: `Missing template: ${cfg.template}` }))
  process.exit(1)
}

const runId = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const runPath = join(root, 'demo-runs', cfg.runSegment, runId)

mkdirSync(runPath, { recursive: true })
cpSync(templatePath, runPath, { recursive: true })

mkdirSync(join(runPath, 'source'), { recursive: true })
cpSync(join(root, cfg.source[0]), join(runPath, cfg.source[1]))

console.log(
  JSON.stringify({
    runId,
    projectPath: runPath,
  }),
)
