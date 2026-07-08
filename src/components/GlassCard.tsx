import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  bright?: boolean
}

export function GlassCard({ children, className = '', glow = false, bright = false }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${bright ? 'glass-bright' : 'glass'} ${
        glow ? 'glow-accent' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
