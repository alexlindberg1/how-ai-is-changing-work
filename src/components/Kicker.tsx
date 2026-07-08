import { motion } from 'motion/react'

interface KickerProps {
  children: string
  visible?: boolean
  className?: string
}

export function Kicker({ children, visible = true, className = '' }: KickerProps) {
  if (!visible) return null
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`font-mono text-kicker text-accent tracking-[0.15em] uppercase mb-4 ${className}`}
    >
      {children}
    </motion.p>
  )
}
