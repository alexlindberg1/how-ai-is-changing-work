import { motion } from 'motion/react'
import { SlideShell } from '../components/SlideShell'
import { Kicker } from '../components/Kicker'
import { InsightCard } from '../components/workModel/InsightCard'
import { AiConnectionStage } from '../components/workModel/AiConnectionStage'

interface SlideProps {
  step: number
}

export function Slide03AiConnectionLayer({ step }: SlideProps) {
  return (
    <SlideShell align="start" wide>
      <Kicker visible={step >= 0}>The Shift</Kicker>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 16 }}
        className="font-display text-display-lg font-semibold"
      >
        AI Is Entering the Human Connection Layer
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 12 }}
        transition={{ delay: 0.05 }}
        className="mt-3 mb-6 max-w-3xl text-body-lg text-text-muted"
      >
        For the first time, software can help connect the dots.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <AiConnectionStage step={step} />
      </motion.div>

      <InsightCard visible={step >= 6}>
        AI becomes the primary orchestration layer.
        <br />
        <span className="text-accent-bright">
          Humans stay in the loop where judgment is needed.
        </span>
      </InsightCard>
    </SlideShell>
  )
}
