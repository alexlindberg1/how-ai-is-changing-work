import { motion } from 'motion/react'
import { SlideShell } from '../components/SlideShell'
import { Kicker } from '../components/Kicker'
import { GlassCard } from '../components/GlassCard'
import { FlowNode } from '../components/FlowNode'
import { AnimatedArrow } from '../components/AnimatedArrow'
import { InsightCard } from '../components/workModel/InsightCard'
import { AgenticLoopPanel } from '../components/agenticLoop/AgenticLoopPanel'
import { AI_COLOR } from '../components/workModel/stageLayout'

interface SlideProps {
  step: number
}

const linearFlow = ['Input', 'Process', 'Output']

export function Slide04AgenticComparison({ step }: SlideProps) {
  const showLinear = step >= 1
  const showLinearCallout = step >= 2
  const showLoop = step >= 3
  const loopRunning = step >= 4
  const includeReview = step >= 5

  return (
    <SlideShell align="start" wide>
      <Kicker visible={step >= 0}>The Mechanism</Kicker>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 16 }}
        className="font-display text-display-lg font-semibold"
      >
        From Instructions to Outcomes
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 12 }}
        transition={{ delay: 0.05 }}
        className="mt-3 mb-6 max-w-3xl text-body-lg text-text-muted"
      >
        Traditional software executes steps. AI agents pursue goals.
      </motion.p>

      <div className="grid items-stretch gap-6 lg:grid-cols-[2fr_3fr] lg:gap-10">
        {/* Traditional software: one linear pass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showLinear ? 1 : 0, y: showLinear ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="flex h-full flex-col items-center gap-1">
            <p className="mb-1 self-start font-mono text-kicker uppercase tracking-[0.14em] text-text-dim">
              Traditional Software
            </p>
            <p className="mb-4 self-start font-display text-[0.95rem] text-text-muted">
              Runs the steps it was given.
            </p>

            <div className="mb-4 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-[0.68rem] text-text-muted">
              Task: “Export overdue invoices”
            </div>

            <div className="flex w-full max-w-[15rem] flex-col items-stretch">
              {linearFlow.map((label, i) => (
                <div key={label}>
                  <FlowNode label={label} active={showLinear} delay={i * 0.08} />
                  {i < linearFlow.length - 1 && (
                    <div className="flex justify-center">
                      <AnimatedArrow direction="down" active={showLinear} delay={i * 0.08} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: showLinearCallout ? 1 : 0, y: showLinearCallout ? 0 : 8 }}
              transition={{ duration: 0.45 }}
              className="mt-5 rounded-full bg-accent-soft px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent"
            >
              One pass. Fixed logic.
            </motion.p>
          </GlassCard>
        </motion.div>

        {/* AI agent: the loop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showLoop ? 1 : 0, y: showLoop ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="h-full">
            <p
              className="mb-1 font-mono text-kicker uppercase tracking-[0.14em]"
              style={{ color: AI_COLOR }}
            >
              AI Agent
            </p>
            <p className="mb-4 font-display text-[0.95rem] text-text-muted">
              Works toward the goal, checking results as it goes.
            </p>
            <AgenticLoopPanel
              visible={showLoop}
              running={loopRunning}
              includeReview={includeReview}
            />
          </GlassCard>
        </motion.div>
      </div>

      <InsightCard visible={step >= 6}>
        Traditional software follows instructions.
        <br />
        <span className="text-accent-bright">
          AI agents work toward outcomes — they inspect results, adapt, and continue.
        </span>
      </InsightCard>
    </SlideShell>
  )
}
