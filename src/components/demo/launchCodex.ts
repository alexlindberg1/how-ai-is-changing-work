export interface LaunchResult {
  /** Toast message describing what actually happened. */
  message: string
}

export interface CodexLaunchConfig {
  /** Which fresh-run template prepare-codex-run.mjs should copy (localhost dev only). */
  demoKey: 'dataAnalysis' | 'proposal'
  /** Prompt prefilled in the Codex composer. Use __RUN_ID__ for the fresh run id. */
  preparedPrompt: string
  /** Absolute local workspace path for Codex when hosted or prepare API is unavailable. */
  localCodexPath: string
}

function isLocalDevHost(): boolean {
  const host = window.location.hostname
  return host === 'localhost' || host === '127.0.0.1' || host === '[::1]'
}

function makeRunId(): string {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
}

async function prepareWorkspace(
  demoKey: CodexLaunchConfig['demoKey'],
): Promise<{ projectPath: string; runId: string }> {
  const res = await fetch('/api/codex/prepare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ demoKey }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Prepare failed (${res.status})`)
  }

  return (await res.json()) as { projectPath: string; runId: string }
}

async function resolveWorkspace(
  config: CodexLaunchConfig,
): Promise<{ projectPath: string; runId: string; freshRun: boolean }> {
  if (isLocalDevHost()) {
    try {
      const prepared = await prepareWorkspace(config.demoKey)
      return { ...prepared, freshRun: true }
    } catch {
      // Fall back to the configured local path if the dev prepare API is down.
    }
  }

  return {
    projectPath: config.localCodexPath,
    runId: makeRunId(),
    freshRun: false,
  }
}

/**
 * Opens Codex in a new thread via `codex://threads/new` with the prompt and
 * local project path prefilled.
 *
 * - On localhost + `npm run dev`: copies a fresh scaffold into demo-runs/… first.
 * - On hosted URLs (e.g. Render): skips server prep and opens Codex on this
 *   machine using `localCodexPath` — works because `codex://` is handled locally.
 *
 * The deep link pre-fills the composer but does not auto-submit — ideal
 * on stage because the audience sees the prompt before you press Enter.
 */
export async function launchCodex(config: CodexLaunchConfig): Promise<LaunchResult> {
  const { projectPath, runId, freshRun } = await resolveWorkspace(config)
  const prompt = config.preparedPrompt.replaceAll('__RUN_ID__', runId)

  let copied = false
  try {
    await navigator.clipboard.writeText(prompt)
    copied = true
  } catch {
    // Clipboard can fail without focus; the deep link still carries the prompt.
  }

  const params = new URLSearchParams({
    prompt,
    path: projectPath,
  })
  window.location.href = `codex://threads/new?${params.toString()}`

  if (freshRun) {
    return {
      message: copied
        ? `Fresh Codex run ${runId} — new thread opening (prompt copied as backup)`
        : `Fresh Codex run ${runId} — new thread opening`,
    }
  }

  return {
    message: copied
      ? `Opening Codex on this machine — prompt prefilled (also copied as backup)`
      : `Opening Codex on this machine — prompt prefilled`,
  }
}
