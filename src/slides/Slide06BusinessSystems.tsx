import { motion } from 'motion/react'
import { SlideShell } from '../components/SlideShell'
import { Kicker } from '../components/Kicker'
import { InsightCard } from '../components/workModel/InsightCard'
import { StageTile } from '../components/workModel/StageTile'
import { AfterExperienceCard } from '../components/demo/AfterExperienceCard'
import { AI_COLOR, AI_COLOR_SOFT } from '../components/workModel/stageLayout'

interface SlideProps {
  step: number
}

const systems = [
  { id: 'accounting', label: 'QuickBooks', icon: '◫', live: true },
  { id: 'crm', label: 'CRM', icon: '◎', live: false },
  { id: 'email', label: 'Email', icon: '✉', live: false },
  { id: 'scheduling', label: 'Scheduling', icon: '◷', live: false },
  { id: 'documents', label: 'Documents', icon: '▣', live: false },
  { id: 'data', label: 'Business Data', icon: '▦', live: false },
]

function SparkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5c.5 3.6 2.4 5.5 6 6-3.6.5-5.5 2.4-6 6-.5-3.6-2.4-5.5-6-6 3.6-.5 5.5-2.4 6-6Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Mock of the AI agent session working live against QuickBooks. */
function AgentSessionMock() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      {/* The owner's question */}
      <div className="self-end rounded-xl rounded-br-sm bg-accent-soft px-3.5 py-2">
        <p className="font-display text-[0.78rem] font-medium leading-snug text-text">
          Who is overdue, and what should I do about it?
        </p>
      </div>

      {/* Agent gathering context */}
      <div
        className="rounded-xl rounded-bl-sm border px-3.5 py-2.5"
        style={{ borderColor: 'rgba(76, 141, 255, 0.25)', background: 'rgba(76, 141, 255, 0.04)' }}
      >
        <p className="mb-1.5 font-mono text-[0.52rem] uppercase tracking-[0.1em]" style={{ color: AI_COLOR }}>
          Reading QuickBooks…
        </p>
        <div className="flex flex-wrap gap-1.5">
          {['11 open invoices', '3 customers 30+ days', '$8,450 outstanding'].map((chip) => (
            <span
              key={chip}
              className="rounded-full border px-2 py-0.5 font-mono text-[0.55rem]"
              style={{ borderColor: 'rgba(76, 141, 255, 0.3)', color: AI_COLOR }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="flex-1 space-y-1.5">
        {[
          { who: 'Bluewater Hotel', what: 'Friendly reminder — drafted, ready to send', tone: 'auto' },
          { who: 'North End Diner', what: 'Firm follow-up — 45 days, second notice', tone: 'auto' },
          { who: 'Cedar Ridge HOA', what: 'Open dispute — flagged for your review', tone: 'review' },
        ].map((row) => (
          <div
            key={row.who}
            className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 ${
              row.tone === 'review' ? 'border-accent/35 bg-accent-soft/60' : 'border-border'
            }`}
          >
            <div className="min-w-0">
              <p className="truncate font-display text-[0.72rem] font-semibold text-text">{row.who}</p>
              <p className="truncate font-body text-[0.62rem] text-text-muted">{row.what}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.08em] ${
                row.tone === 'review' ? 'bg-accent text-white' : ''
              }`}
              style={row.tone === 'auto' ? { background: AI_COLOR_SOFT, color: AI_COLOR } : undefined}
            >
              {row.tone === 'review' ? 'Human review' : 'AI handled'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Slide06BusinessSystems({ step }: SlideProps) {
  const visible = step >= 0

  return (
    <SlideShell align="start" wide>
      <Kicker visible={visible}>Demo · Connected Context</Kicker>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        className="font-display text-display-lg font-semibold"
      >
        AI Connected to Your Business Systems
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
        transition={{ delay: 0.05 }}
        className="mt-3 mb-8 max-w-3xl text-body-lg text-text-muted"
      >
        The software stays. The way you interact with it changes.
      </motion.p>

      <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1.2fr] lg:gap-8">
        {/* Your systems */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-baseline gap-3">
            <p className="font-mono text-kicker uppercase tracking-[0.14em] text-text-dim">
              Your Systems
            </p>
            <p className="font-display text-[0.95rem] text-text-muted">
              They stay exactly where they are.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {systems.map((sys, i) => (
              <motion.div
                key={sys.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -12 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative"
              >
                <StageTile label={sys.label} icon={sys.icon} />
                {sys.live && (
                  <motion.span
                    className="absolute -right-2 -top-2 rounded-full px-2 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-white shadow-md"
                    style={{ background: AI_COLOR }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Live demo
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI connects them */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden flex-col items-center justify-center gap-2 lg:flex"
          aria-hidden="true"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: AI_COLOR_SOFT, color: AI_COLOR }}
          >
            <SparkIcon />
          </span>
          <svg width="52" height="20" viewBox="0 0 52 20" fill="none">
            <line
              x1="2"
              y1="10"
              x2="42"
              y2="10"
              stroke={AI_COLOR}
              strokeOpacity="0.45"
              strokeWidth="1.6"
              strokeDasharray="3 5"
            />
            <path
              d="M40 4 L48 10 L40 16"
              stroke={AI_COLOR}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {visible && (
              <circle r="3" cy="10" fill={AI_COLOR}>
                <animate attributeName="cx" values="2;48" dur="1.6s" repeatCount="indefinite" />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.8;1"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </svg>
          <span
            className="text-center font-mono text-[0.6rem] uppercase tracking-[0.12em]"
            style={{ color: AI_COLOR }}
          >
            AI works
            <br />
            across them
          </span>
        </motion.div>

        {/* AI working with the live data */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-baseline gap-3">
            <p className="font-mono text-kicker uppercase tracking-[0.14em]" style={{ color: AI_COLOR }}>
              With AI Connected
            </p>
            <p className="font-display text-[0.95rem] text-text-muted">
              One question, every system answered.
            </p>
          </div>

          <div className="flex-1">
            <AfterExperienceCard title="AI Agent · connected to QuickBooks (sandbox)" visible={visible}>
              <AgentSessionMock />
            </AfterExperienceCard>
          </div>
        </motion.div>
      </div>

      <InsightCard visible={visible}>
        AI becomes more valuable when it understands your business context.
        <br />
        <span className="text-accent-bright">
          The systems remain — AI becomes the layer that connects them.
        </span>
      </InsightCard>
    </SlideShell>
  )
}
