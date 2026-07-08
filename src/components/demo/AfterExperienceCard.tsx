import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { AI_COLOR, AI_COLOR_GLOW } from '../workModel/stageLayout'

interface AfterExperienceCardProps {
  title: string
  visible: boolean
  /** The mock experience rendered inside the browser chrome. */
  children: ReactNode
}

/**
 * The "after" artifact: a browser-framed preview of the AI-generated
 * interactive experience, in the deck's AI-blue accent.
 */
export function AfterExperienceCard({ title, visible, children }: AfterExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col overflow-hidden rounded-2xl glass-bright"
      style={{
        borderColor: 'rgba(76, 141, 255, 0.35)',
        boxShadow: `0 0 32px ${AI_COLOR_GLOW}, 0 20px 80px rgba(20, 20, 20, 0.05)`,
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f26d5f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f2b73f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5fc763]" />
        </span>
        <span
          className="flex-1 truncate rounded-md px-3 py-1 font-mono text-[0.62rem]"
          style={{ background: 'rgba(76, 141, 255, 0.07)', color: AI_COLOR }}
        >
          {title}
        </span>
      </div>

      <div className="min-h-0 flex-1 p-4">{children}</div>
    </motion.div>
  )
}
