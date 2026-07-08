import { motion } from 'motion/react'
import { SlideShell } from '../components/SlideShell'
import { Kicker } from '../components/Kicker'
import { GlassCard } from '../components/GlassCard'
import { InsightCard } from '../components/workModel/InsightCard'
import { AnimatedArrow } from '../components/AnimatedArrow'
import { AI_COLOR, AI_COLOR_GLOW, AI_COLOR_SOFT } from '../components/workModel/stageLayout'

interface SlideProps {
  step: number
}

const todayChain = [
  { label: 'System', human: false },
  { label: 'Gather the information', human: true },
  { label: 'Analyze it', human: true },
  { label: 'Format it', human: true },
  { label: 'Communicate it', human: true },
  { label: 'Decide', human: true },
]

const trades = [
  { from: 'An hour building the report', to: 'Five minutes reviewing it' },
  { from: 'Checking every transaction', to: 'Reviewing the exceptions' },
  { from: 'Drafting from scratch', to: 'Applying judgment to a draft' },
]

function PersonIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SparkIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5c.5 3.6 2.4 5.5 6 6-3.6.5-5.5 2.4-6 6-.5-3.6-2.4-5.5-6-6 3.6-.5 5.5-2.4 6-6Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** A compact step in the today-chain. */
function ChainNode({ label, human, delay }: { label: string; human: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex w-full items-center gap-3 rounded-xl border border-border glass px-4 py-2.5"
    >
      {human ? (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <PersonIcon />
        </span>
      ) : (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-sm text-accent">
          ◫
        </span>
      )}
      <span className="font-display text-[0.98rem] font-medium leading-none text-text">
        {label}
      </span>
    </motion.div>
  )
}

export function Slide08ValueChain({ step }: SlideProps) {
  const visible = step >= 0

  return (
    <SlideShell align="start" wide>
      <Kicker visible={visible}>The Human Role</Kicker>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        className="font-display text-display-lg font-semibold"
      >
        Humans Move Up the Value Chain
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
        transition={{ delay: 0.05 }}
        className="mt-3 mb-8 max-w-3xl text-body-lg text-text-muted"
      >
        AI takes on the assembly work. People keep the judgment.
      </motion.p>

      <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Today */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="h-full">
            <p className="mb-1 font-mono text-kicker uppercase tracking-[0.14em] text-text-dim">
              Today
            </p>
            <p className="mb-5 font-display text-[0.95rem] text-text-muted">
              People carry every step between the system and the decision.
            </p>
            <div className="mx-auto flex max-w-xs flex-col items-center">
              {todayChain.map((node, i) => (
                <div key={node.label} className="w-full">
                  <ChainNode label={node.label} human={node.human} delay={i * 0.07} />
                  {i < todayChain.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <AnimatedArrow direction="down" active={visible} delay={i * 0.07} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Emerging */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <GlassCard className="flex h-full flex-col">
            <p
              className="mb-1 font-mono text-kicker uppercase tracking-[0.14em]"
              style={{ color: AI_COLOR }}
            >
              Emerging
            </p>
            <p className="mb-5 font-display text-[0.95rem] text-text-muted">
              AI assembles. People review, judge, and decide.
            </p>

            <div className="mx-auto flex w-full max-w-xs flex-col items-center">
              <ChainNode label="System" human={false} delay={0.1} />
              <div className="flex justify-center py-0.5">
                <AnimatedArrow direction="down" active={visible} delay={0.1} />
              </div>

              {/* AI does the assembly */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-full rounded-xl border glass-bright px-4 py-3"
                style={{
                  borderColor: 'rgba(76, 141, 255, 0.4)',
                  boxShadow: `0 0 24px ${AI_COLOR_GLOW}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ background: AI_COLOR_SOFT, color: AI_COLOR }}
                  >
                    <SparkIcon />
                  </span>
                  <span className="font-display text-[0.98rem] font-semibold leading-none text-text">
                    AI
                  </span>
                </div>
                <p
                  className="mt-1.5 pl-10 font-mono text-[0.6rem] uppercase tracking-[0.1em]"
                  style={{ color: AI_COLOR }}
                >
                  Gathers · Analyzes · Prepares
                </p>
              </motion.div>

              <div className="flex justify-center py-0.5">
                <AnimatedArrow direction="down" active={visible} delay={0.25} />
              </div>

              {/* Human keeps the judgment */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="w-full rounded-xl border border-accent/40 glass-bright px-4 py-3 glow-accent"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <PersonIcon />
                  </span>
                  <span className="font-display text-[0.98rem] font-semibold leading-none text-text">
                    Human
                  </span>
                </div>
                <p className="mt-1.5 pl-10 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-accent">
                  Reviews · Judges · Decides
                </p>
              </motion.div>
            </div>

            {/* The trade */}
            <div className="mt-6 space-y-2">
              {trades.map((trade, i) => (
                <motion.div
                  key={trade.from}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border px-3.5 py-2"
                >
                  <span className="font-body text-[0.78rem] text-text-dim line-through decoration-text-dim/50">
                    {trade.from}
                  </span>
                  <span className="shrink-0 text-text-dim" aria-hidden="true">
                    →
                  </span>
                  <span className="text-right font-display text-[0.8rem] font-medium text-text">
                    {trade.to}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <InsightCard visible={visible}>
        Humans are not removed from the process.
        <br />
        <span className="text-accent-bright">
          They move to the parts where human judgment matters most.
        </span>
      </InsightCard>
    </SlideShell>
  )
}
