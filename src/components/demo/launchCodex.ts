export interface LaunchResult {
  /** Toast message describing what actually happened. */
  message: string
}

export interface CodexLaunchConfig {
  /** Which demo scaffold to copy into a fresh run folder. */
  demoKey: 'dataAnalysis' | 'proposal'
  /** Prompt prefilled in the Codex composer. Use __RUN_ID__ for the fresh run id. */
  preparedPrompt: string
}

function isLocalDevHost(): boolean {
  const host = window.location.hostname
  return host === 'localhost' || host === '127.0.0.1' || host === '[::1]'
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

/**
 * Materializes a fresh workspace, then opens Codex in a new thread via
 * `codex://threads/new` with the prompt and path prefilled.
 *
 * The deep link pre-fills the composer but does not auto-submit — ideal
 * on stage because the audience sees the prompt before you press Enter.
 *
 * On hosted deployments (e.g. Render), Codex demos are local-only.
 */
export async function launchCodex(config: CodexLaunchConfig): Promise<LaunchResult> {
  if (!isLocalDevHost()) {
    return {
      message:
        'Codex live demo runs locally — use npm run dev on your laptop for this button.',
    }
  }

  let projectPath: string
  let runId: string

  try {
    ;({ projectPath, runId } = await prepareWorkspace(config.demoKey))
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    return {
      message: `Could not prepare fresh workspace — run the deck with npm run dev (${detail})`,
    }
  }

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

  return {
    message: copied
      ? `Fresh Codex run ${runId} — new thread opening (prompt copied as backup)`
      : `Fresh Codex run ${runId} — new thread opening`,
  }
}
