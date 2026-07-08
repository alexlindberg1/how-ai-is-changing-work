/** Data for the Slide 4 agentic-loop comparison. */

export type LoopNodeId = 'think' | 'act' | 'observe' | 'adjust'
export type ScriptNodeId = LoopNodeId | 'review' | 'complete'

export interface ScriptItem {
  /** Which node lights up while this beat plays. */
  node: ScriptNodeId
  text: string
  /** Which pass through the loop this beat belongs to. */
  pass: number
}

export const GOAL_TEXT = 'Identify overdue customers and recommend next steps'

export const loopNodes: Array<{ id: LoopNodeId; label: string }> = [
  { id: 'think', label: 'Think' },
  { id: 'act', label: 'Act' },
  { id: 'observe', label: 'Observe' },
  { id: 'adjust', label: 'Adjust' },
]

/**
 * The worked business example the AI narrates while circling the loop.
 * The 'review' beat is skipped until the slide step that introduces the
 * human-review branch.
 */
export const loopScript: ScriptItem[] = [
  { node: 'think', text: '“I need invoice data.”', pass: 1 },
  { node: 'act', text: 'Query the accounting system', pass: 1 },
  { node: 'observe', text: '3 invoices are 30+ days overdue', pass: 1 },
  { node: 'adjust', text: '“I should check customer context.”', pass: 1 },
  { node: 'act', text: 'Read CRM notes + email history', pass: 2 },
  { node: 'observe', text: 'One customer has an open dispute', pass: 2 },
  { node: 'review', text: 'Open dispute → route to a person', pass: 3 },
  { node: 'complete', text: 'Draft follow-ups for the rest', pass: 3 },
]

export const SCRIPT_TICK_MS = 2100
