/**
 * Configuration for the two demo-transformation slides.
 *
 * Everything the presenter may need to swap before a talk lives here:
 * source files, Codex demo keys, and prepared prompts.
 *
 * Each launch copies a clean template into demo-runs/…/{runId}/ so Codex
 * starts from a fresh scaffold instead of reusing a prior test build.
 */

export interface DemoArtifactConfig {
  /** Which fresh-run template prepare-codex-run.mjs should copy. */
  demoKey: 'dataAnalysis' | 'proposal'
  sourceType: 'xlsx' | 'pdf'
  /** Public URL of the source artifact (served from /public for in-slide preview). */
  sourceFile: string
  /** Filename shown on the artifact card. */
  sourceLabel: string
  /** Short metadata line under the filename. */
  sourceMeta: string
  /** Path to the source file inside the run workspace, referenced in the prompt. */
  projectSourcePath: string
  /** Prompt prefilled in Codex via codex://threads/new. __RUN_ID__ is replaced at launch. */
  preparedPrompt: string
  /** Hint shown below the launch buttons. */
  launchHint: string
}

const base = import.meta.env.BASE_URL

export const demoArtifacts: Record<'dataAnalysis' | 'proposal', DemoArtifactConfig> = {
  dataAnalysis: {
    demoKey: 'dataAnalysis',
    sourceType: 'xlsx',
    sourceFile: `${base}demo/summit-plumbing-financials.xlsx`,
    sourceLabel: 'summit-plumbing-financials.xlsx',
    sourceMeta: '3 sheets · 140 invoices · Jul 2025 – Jun 2026',
    projectSourcePath: 'source/summit-plumbing-financials.xlsx',
    preparedPrompt: `@Sites

Standalone live demo run __RUN_ID__.

Use the quick / fast model with low reasoning effort. This is a timed stage demo — one pass, minimal planning, prioritize speed.

Analyze the workbook at source/summit-plumbing-financials.xlsx and build a polished interactive executive dashboard for a non-technical business owner.

Focus on:
- total revenue
- month-over-month trends
- top customers
- top products or services
- areas of decline
- unusual changes or outliers
- three recommended actions

Do not simply reproduce the spreadsheet. Turn the underlying data into an interactive decision-making tool.

Fresh build rules:
- Treat this as a brand-new workspace. Ignore prior threads or cached context.
- Replace the placeholder src/App.tsx entirely — do not incrementally patch old code.
- Use @Sites to build and run the app in this workspace.

WHEN FINISHED — required for live demo:
1. Run \`npm install\` if dependencies are not installed.
2. Start the dev server with \`npm run dev\`.
3. Your final message MUST include the full local site URL on its own line, in this exact format:

   LIVE DEMO URL: http://localhost:PORT

   Replace PORT with the actual port Vite/vinext prints (usually 5173).
4. Do not end without printing that URL. Do not ask me to prompt again for it.`,
    launchHint: 'Prepares a fresh workspace + new Codex thread — press Enter to run',
  },

  proposal: {
    demoKey: 'proposal',
    sourceType: 'pdf',
    sourceFile: `${base}demo/summit-plumbing-proposal.pdf`,
    sourceLabel: 'summit-plumbing-proposal.pdf',
    sourceMeta: '4 pages · Proposal #2026-047',
    projectSourcePath: 'source/summit-plumbing-proposal.pdf',
    preparedPrompt: `@Sites

Standalone live demo run __RUN_ID__.

Use the quick / fast model with low reasoning effort. This is a timed stage demo — one pass, minimal planning, prioritize speed.

Transform the proposal at source/summit-plumbing-proposal.pdf into a polished interactive web-based proposal experience.

Preserve the substance of the original proposal, including:
- project overview
- scope and deliverables
- timeline
- pricing or investment
- assumptions
- next steps

Do not simply recreate the PDF as a webpage.

Design the experience around how a prospective client would want to explore and understand the proposal.

Use:
- clear navigation
- interactive or expandable scope sections
- a visual timeline
- prominent pricing / investment presentation
- polished next-step call to action

Fresh build rules:
- Treat this as a brand-new workspace. Ignore prior threads or cached context.
- Replace the placeholder src/App.tsx entirely — do not incrementally patch old code.
- Use @Sites to build and run the app in this workspace.

WHEN FINISHED — required for live demo:
1. Run \`npm install\` if dependencies are not installed.
2. Start the dev server with \`npm run dev\`.
3. Your final message MUST include the full local site URL on its own line, in this exact format:

   LIVE DEMO URL: http://localhost:PORT

   Replace PORT with the actual port Vite prints (usually 5173).
4. Do not end without printing that URL. Do not ask me to prompt again for it.`,
    launchHint: 'Prepares a fresh workspace + new Codex thread — press Enter to run',
  },
}

/**
 * Slide 7 live demo: AI working directly against QuickBooks Online (sandbox).
 * The workspace at demo/qbo holds the API credentials (.env) and scripts.
 */
export const systemsDemo = {
  projectPath: '/Users/alexlindberg/Desktop/elite_ai_automations/admin/presentation_how_ai_is_changing_work/demo/qbo',
  preparedPrompt: `Using the QuickBooks Online sandbox credentials in .env (see README.md for the API base URL and auth flow):

1. Refresh the access token.
2. Query all open invoices and identify customers with invoices 30+ days overdue.
3. For each overdue customer, summarize: total outstanding, how overdue, and invoice history.
4. Recommend a specific next step per customer (friendly reminder, firm follow-up, or flag for my review).
5. Draft the follow-up email for the most overdue customer.

Present the results as a clear, readable summary a business owner could act on immediately.`,
  launchHint: 'Opens Codex in the QuickBooks workspace — press Enter to run',
}
