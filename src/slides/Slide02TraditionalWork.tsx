import { motion } from 'motion/react'
import { SlideShell } from '../components/SlideShell'
import { Kicker } from '../components/Kicker'
import { InsightCard } from '../components/workModel/InsightCard'
import { WorkModelStage } from '../components/workModel/WorkModelStage'

interface SlideProps {
  step: number
}

export function Slide02TraditionalWork({ step }: SlideProps) {
  const showContent = step >= 1

  return (
    <SlideShell align="start" wide>
      <Kicker visible={step >= 0}>The Status Quo</Kicker>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 16 }}
        className="font-display text-display-lg font-semibold"
      >
        How Work Still Gets Done
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 12 }}
        transition={{ delay: 0.05 }}
        className="mt-3 mb-6 max-w-3xl text-body-lg text-text-muted"
      >
        Most business work is turning scattered information into action.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <WorkModelStage active={showContent} />
      </motion.div>

      <InsightCard visible={step >= 6}>
        In many businesses, people are not just doing the work.
        <br />
        <span className="text-accent-bright">
          They are also moving information between every system.
        </span>
      </InsightCard>
    </SlideShell>
  )
}
