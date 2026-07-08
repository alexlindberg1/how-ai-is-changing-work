export interface SlideMeta {
  id: string
  title: string
  steps: number
  speakerNotes: string[]
}

export const slides: SlideMeta[] = [
  {
    id: 'opening',
    title: 'Opening',
    steps: 3,
    speakerNotes: [
      'Thank the group. Callback: presented here ~1 year ago at Dial One. Reintro: Alex Lindberg, Elite AI — one-person company, high-impact tech to modernize operations.',
      'AI has moved fast since last talk. Goal today is not every tool/trend — it is how AI is changing how work actually gets done.',
      'Why it matters: individuals can be incredibly productive with the right tools, no deep technical background required. Walk through concepts and what business leaders should experiment with now.',
    ],
  },
  {
    id: 'traditional-work',
    title: 'How Work Still Gets Done',
    steps: 7,
    speakerNotes: [
      'Before AI — how work actually gets done today. Most businesses have plenty of software, but information is scattered.',
      'Systems of record: accounting, email, CRM, spreadsheets, scheduling, vendor portals. Separate tools, not connected.',
      'Humans are the connective tissue. Owner, office manager, bookkeeper, operations lead — they bridge every system.',
      'Watch information flow in: data pulled from one system, checked against another, read from email threads.',
      'Business artifacts emerge: reports, quotes, invoices, emails sent, meetings, decisions.',
      'Information flows out through people — exported, formatted, emailed, discussed, decided on.',
      'Key insight: people are not just doing the work — they are also moving information between every system.',
    ],
  },
  {
    id: 'ai-connection-layer',
    title: 'AI Is Entering the Human Connection Layer',
    steps: 7,
    speakerNotes: [
      'Same business model as the last slide — same systems on the left, same artifacts and actions on the right.',
      'The shift is in the middle. On Slide 2 people were the glue. Now the AI agent moves to the center and becomes the orchestration layer — people step back into a selective role.',
      'Pattern A — AI acts directly: information flows from a system into the AI, it reads and drafts, and the output goes straight to action. A report, an email, an updated quote.',
      'Pattern B — human in the loop: for judgment or approval, the AI routes the work to a person, they review or adjust, it comes back to the AI, then on to action. Watch the red packet make that detour.',
      'The capability chips — read, interpret, summarize, draft, analyze, recommend, act — that primary middle-layer work now runs through AI.',
      'Both patterns run side by side: some work is automated end-to-end, some is AI-assisted with a human check. That is the modern AI-first, human-in-the-loop workflow.',
      'Key insight: AI becomes the primary orchestration layer, and humans stay in the loop where judgment is needed.',
    ],
  },
  {
    id: 'agentic-loop',
    title: 'From Instructions to Outcomes',
    steps: 7,
    speakerNotes: [
      'Why can AI do what we just saw? Because it works differently from every tool before it.',
      'Traditional software: input, process, output. Run a report, export overdue invoices. One pass through fixed logic.',
      'That is genuinely good — for predefined tasks. But it only ever does exactly what it was programmed to do.',
      'An AI agent starts from a goal instead: identify overdue customers and recommend next steps. Around the loop: think, act, observe, adjust.',
      'Watch it work the example: it realizes it needs invoice data, queries accounting, sees three overdue invoices, decides to check customer context, reads the CRM — multiple passes, checking results each time.',
      'And notice the branch: it finds an open dispute, so that one case goes to human review. The rest it carries straight through to the outcome.',
      'Key insight: traditional software follows instructions. AI agents work toward outcomes — they inspect results, adapt, and continue.',
    ],
  },
  {
    id: 'artifact-spectrum',
    title: 'The Artifact Itself Is Changing',
    steps: 1,
    speakerNotes: [
      'So far we have talked about how work gets done. But AI also changes what work produces.',
      'Business outputs used to be fixed artifacts — a PDF, a spreadsheet, a Word doc. Same file for everyone, static the moment you export it.',
      'AI makes it easy to turn those same outputs into interactive artifacts: filters, selectable options, drill-downs, dynamic pricing, embedded actions. The reader explores instead of just reading.',
      'And the far end of the spectrum is adaptive: personalized content, different views for different users, AI-generated explanations, recommendations, behavior-aware follow-up.',
      'The next two demos are proof of this shift — a spreadsheet becoming a decision tool, and a PDF proposal becoming an interactive client experience.',
      'Key insight: the expertise and the data stay the same. The form of the output changes.',
    ],
  },
  {
    id: 'demo-dashboard',
    title: 'From Spreadsheet to Decision Tool',
    steps: 7,
    speakerNotes: [
      'AI does not just change how work is done — it changes what work produces. First example: data analysis.',
      'This is a real workbook — a year of plumbing-company financials. Invoices, customers, monthly summary.',
      'Click Preview Source Workbook: raw rows, three tabs, useful data — but you have to dig to find what matters.',
      'AI can rebuild the same data around decisions instead of rows.',
      'The after state: KPIs, the revenue trend, top customers, key insights, and ranked recommended actions.',
      'Live demo: Build Interactive Version copies a fresh Codex workspace, opens a new thread with the @Sites prompt prefilled, and the workbook is already in the run folder. Press Enter.',
      'Takeaway: the spreadsheet stores the data. The interactive experience helps someone decide.',
    ],
  },
  {
    id: 'demo-proposal',
    title: 'From PDF to Interactive Experience',
    steps: 7,
    speakerNotes: [
      'Second example: the humble proposal PDF. Same expertise, better client experience.',
      'This is a real 4-page proposal — a hotel repipe project. Overview, scope, timeline, pricing, next steps.',
      'Click Preview Source Proposal: it is a perfectly good document, but the client has to scroll, interpret, and find the next step themselves.',
      'AI can turn the same proposal into an experience built around how a client explores it.',
      'The after state: navigable sections, expandable scope, a visual timeline, prominent investment, and a clear call to action.',
      'Live demo: Build Interactive Version copies a fresh Codex workspace, opens a new thread with the @Sites prompt prefilled, and the PDF is already in the run folder. Press Enter.',
      'Takeaway: the PDF communicates information. The interactive experience helps the client engage with it.',
    ],
  },
  {
    id: 'business-systems',
    title: 'AI Connected to Your Business Systems',
    steps: 1,
    speakerNotes: [
      'This is the most important idea for business leaders: AI alone is useful. AI connected to your business systems is transformative.',
      'Left side: your business already runs on these systems — QuickBooks, CRM, email, scheduling, documents, business data. They are not going away. QuickBooks stays QuickBooks.',
      'Right side: with AI connected, you ask one question — who is overdue and what should I do about it — and AI reads the live data and comes back with ranked, actionable answers.',
      'Notice the pattern from earlier: two cases AI handles end-to-end, one case flagged for human review because there is an open dispute.',
      'Live demo: Run Live Demo opens Codex in the QuickBooks workspace with the prompt prefilled — it queries the real QBO sandbox API. Press Enter.',
      'Key insight: the systems remain. AI becomes the layer that connects them. Competitive advantage comes from your proprietary business context, not generic AI.',
    ],
  },
  {
    id: 'value-chain',
    title: 'Humans Move Up the Value Chain',
    steps: 1,
    speakerNotes: [
      'Transition from the QBO demo: when this pattern spreads across a business, the role of the human changes.',
      'Go back to where we started. Historically, people were the connection layer because there was no alternative — gather, interpret, move, format, carry it through.',
      'Left: today, people carry every step between the system and the decision. Right: AI gathers, analyzes, and prepares — people review, judge, and decide.',
      'The trade: an hour building the report becomes five minutes reviewing it. Checking every transaction becomes reviewing the exceptions. Drafting from scratch becomes applying judgment to something already prepared.',
      'The human is still there — more of their time goes to judgment, relationships, accountability, and strategy, and less to moving information around.',
      'Key line: humans are not removed from the process. They move to the parts where human judgment matters most.',
    ],
  },
  {
    id: 'start-small',
    title: 'Start Small. Start Now.',
    steps: 1,
    speakerNotes: [
      'So what should you actually do with all of this? Not a giant AI transformation initiative.',
      'One: pick one recurring workflow — something someone does every week.',
      'Two: look for information movement — copying, summarizing, reconciling, reporting, following up. Then ask: can AI gather it, summarize it, draft it, flag the exception, recommend the next step?',
      'Three: experiment before automating. Use AI manually first, learn where it helps, then connect it to your systems once the value is proven.',
      'The takeaway: one person, one workflow, one month.',
      'Final line — let it breathe: the organizations that win with AI will not necessarily have the best AI. They will have the best business context connected to AI. Thank the audience.',
    ],
  },
  {
    id: 'questions',
    title: 'Questions',
    steps: 1,
    speakerNotes: [
      'Open the floor for questions. Offer to talk one-on-one afterward about what this could look like in their business.',
    ],
  },
]

export const finalStatement = {
  lead: 'The organizations that win with AI will not necessarily have the best AI.',
  emphasis: 'They will have the best business context connected to AI.',
}
