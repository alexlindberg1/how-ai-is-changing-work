import { motion } from 'motion/react'
import { SlideShell } from '../components/SlideShell'
import { Kicker } from '../components/Kicker'
import { GlassCard } from '../components/GlassCard'
import { finalStatement } from '../content/slides'

interface SlideProps {
  step: number
}

const playbook = [
  {
    title: 'Pick one recurring workflow',
    detail: 'Something that happens every week.',
    icon: '◉',
  },
  {
    title: 'Look for information movement',
    detail: 'Copying, summarizing, reconciling, reporting, following up.',
    icon: '⇄',
  },
  {
    title: 'Experiment before automating',
    detail: 'Use AI manually first. Connect systems where value is proven.',
    icon: '✓',
  },
]

export function Slide09StartSmall({ step }: SlideProps) {
  const visible = step >= 0

  return (
    <SlideShell align="start" wide>
      <Kicker visible={visible}>What To Do Now</Kicker>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        className="font-display text-display-lg font-semibold"
      >
        Start Small. Start Now.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
        transition={{ delay: 0.05 }}
        className="mt-3 mb-10 max-w-3xl text-body-lg text-text-muted"
      >
        You do not need to transform the whole company at once.
      </motion.p>

      {/* Three-step playbook */}
      <div className="grid gap-5 md:grid-cols-3">
        {playbook.map((block, i) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
          >
            <GlassCard className="h-full">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft font-display text-lg text-accent">
                  {block.icon}
                </span>
                <span className="font-display text-display-md font-semibold text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mb-2 font-display text-[1.2rem] font-semibold leading-snug text-text">
                {block.title}
              </p>
              <p className="font-body text-[0.95rem] leading-relaxed text-text-muted">
                {block.detail}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* The mantra */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 text-center font-display text-display-md font-semibold text-text"
      >
        One person. <span className="text-accent">One workflow.</span> One month.
      </motion.p>

      {/* Final statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
        transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10"
      >
        <GlassCard glow className="text-center">
          <p className="font-display text-body-lg font-medium text-text-muted">
            {finalStatement.lead}
          </p>
          <p className="mt-3 font-display text-display-md font-semibold leading-snug text-accent-bright">
            {finalStatement.emphasis}
          </p>
        </GlassCard>
      </motion.div>
    </SlideShell>
  )
}
