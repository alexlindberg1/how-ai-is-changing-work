/** Data for the Slide 2 work-model stage. */

export type ZoneId = 'systems' | 'humans' | 'artifacts'

export const systems = [
  { id: 'accounting', label: 'Accounting', icon: '◫' },
  { id: 'email', label: 'Email', icon: '✉' },
  { id: 'crm', label: 'CRM', icon: '◎' },
  { id: 'sheets', label: 'Spreadsheets', icon: '▦' },
  { id: 'scheduling', label: 'Scheduling', icon: '◷' },
  { id: 'portals', label: 'Vendor Portals', icon: '◇' },
]

export const artifacts = [
  { id: 'reports', label: 'Reports', icon: '▤', completion: 'Report delivered' },
  { id: 'quotes', label: 'Quotes & Proposals', icon: '▣', completion: 'Quote sent' },
  { id: 'invoices', label: 'Invoices', icon: '◫', completion: 'Invoice sent' },
  { id: 'emails', label: 'Emails Sent', icon: '✉', completion: 'Email sent' },
  { id: 'meetings', label: 'Meetings', icon: '◉', completion: 'Decision made' },
  { id: 'decisions', label: 'Decisions', icon: '◈', completion: 'Approval signed' },
]

export const humans = ['Owner', 'Office Manager', 'Bookkeeper', 'Operations Lead']

/** Slide 3: what the AI node can do inside the connection layer. */
export const capabilities = [
  'Read',
  'Interpret',
  'Summarize',
  'Draft',
  'Analyze',
  'Recommend',
  'Act',
]

/**
 * Cool accent for the AI orchestration hub on Slide 3. AI now owns the center
 * (it inherits the human orb's visual language), while the warm-red accent is
 * reused for the selective human-in-the-loop path.
 */
export const AI_COLOR = '#4c8dff'
export const AI_COLOR_SOFT = 'rgba(76, 141, 255, 0.12)'
export const AI_COLOR_GLOW = 'rgba(76, 141, 255, 0.28)'

/**
 * Slide 3 flow patterns. Indices map into `systems` and `artifacts`.
 *
 * Pattern A (direct): system → AI → action. AI handles it end-to-end.
 * Pattern B (HiTL):   system → AI → human review → AI → action.
 *
 * Kept deliberately small so the two behaviours read clearly without clutter.
 */
export const AI_DIRECT_FLOWS = [
  { sys: 1, art: 3 }, // Email → Emails Sent (AI drafts + sends)
  { sys: 3, art: 0 }, // Spreadsheets → Reports (AI generates the report)
  { sys: 2, art: 1 }, // CRM → Quotes & Proposals (AI updates the quote)
]

export const AI_HITL_FLOWS = [
  { sys: 0, art: 2 }, // Accounting → Invoices (AI drafts, human approves)
  { sys: 4, art: 5 }, // Scheduling → Decisions (AI recommends, human decides)
]

/**
 * Shared clock for the hub → artifact relay so the packet, the tile pulse,
 * and the completion fly-off chain into one readable story per artifact:
 * t = i * RELAY_STAGGER          packet leaves the orb
 * t + RELAY_TRAVEL               packet reaches the tile → tile pulses
 * t + RELAY_TRAVEL + 0.35        completion chip launches off-screen
 */
export const RELAY_STAGGER = 3
export const RELAY_TRAVEL = 2
export const RELAY_CYCLE = artifacts.length * RELAY_STAGGER
