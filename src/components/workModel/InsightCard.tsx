import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { GlassCard } from '../GlassCard'

interface InsightCardProps {
  visible: boolean
  children: ReactNode
}

export function InsightCard({ visible, children }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6"
    >
      <GlassCard glow={visible}>
        <p className="font-display text-display-md font-medium text-center leading-snug">
          {children}
        </p>
      </GlassCard>
    </motion.div>
  )
}
