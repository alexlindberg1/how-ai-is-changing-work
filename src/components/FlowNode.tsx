import { motion } from 'motion/react'

interface FlowNodeProps {
  label: string
  active?: boolean
  highlight?: boolean
  icon?: React.ReactNode
  delay?: number
}

export function FlowNode({ label, active = false, highlight = false, icon, delay = 0 }: FlowNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: active ? 1 : 0.35,
        scale: active ? 1 : 0.95,
      }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center gap-3 rounded-xl px-5 py-4 transition-all ${
        highlight
          ? 'glass-bright glow-accent border-accent/30'
          : active
            ? 'glass-bright'
            : 'glass'
      }`}
    >
      {icon && <span className="text-accent shrink-0">{icon}</span>}
      <span
        className={`font-display text-body-lg font-medium ${
          highlight ? 'text-accent-bright' : active ? 'text-text' : 'text-text-dim'
        }`}
      >
        {label}
      </span>
      {highlight && (
        <motion.div
          className="absolute inset-0 rounded-xl border border-accent/40"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}
