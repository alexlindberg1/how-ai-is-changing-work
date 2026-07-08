/**
 * Keeps demo project source/ folders in sync with public/demo/ artifacts
 * used for in-slide previews.
 *
 * Run: node scripts/sync-demo-sources.mjs
 */
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const pairs = [
  ['public/demo/summit-plumbing-financials.xlsx', 'demo-data-analysis/source/summit-plumbing-financials.xlsx'],
  ['public/demo/summit-plumbing-proposal.pdf', 'demo-proposal/source/summit-plumbing-proposal.pdf'],
  ['public/demo/summit-plumbing-financials.xlsx', 'demo-templates/data-analysis/source/summit-plumbing-financials.xlsx'],
  ['public/demo/summit-plumbing-proposal.pdf', 'demo-templates/proposal/source/summit-plumbing-proposal.pdf'],
]

for (const [src, dest] of pairs) {
  mkdirSync(dirname(join(root, dest)), { recursive: true })
  copyFileSync(join(root, src), join(root, dest))
  console.log(`Synced ${dest}`)
}
