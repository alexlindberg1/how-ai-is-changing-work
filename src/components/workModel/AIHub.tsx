import { motion } from 'motion/react'
import { AI_COLOR, AI_COLOR_GLOW, AI_COLOR_SOFT } from './stageLayout'

interface AIHubProps {
  active?: boolean
  /** Emphasised state — the AI has taken over the central orchestration role. */
  primary?: boolean
  onClick?: () => void
  /** Attached to the orb so connectors can measure its edges. */
  circleRef?: React.Ref<HTMLButtonElement>
}

function SparkIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.2c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z"
        fill="currentColor"
      />
      <path
        d="M19 13.5c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3Z"
        fill="currentColor"
        opacity="0.65"
      />
    </svg>
  )
}

/**
 * The AI orchestration hub — the new "brain" of the middle layer on Slide 3.
 * Intentionally inherits the HumanHub's visual language (breathing halo +
 * rotating dashed ring + central orb) so the audience reads it as the same
 * central role Slide 2's human hub used to hold, now occupied by AI.
 */
export function AIHub({ active = true, primary = false, onClick, circleRef }: AIHubProps) {
  return (
    <button
      ref={circleRef}
      type="button"
      onClick={onClick}
      aria-label="AI orchestration layer"
      className="relative flex aspect-square w-[clamp(230px,24vw,320px)] cursor-pointer items-center justify-center border-none bg-transparent p-0"
    >
      {/* Breathing cool halo */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-14%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${AI_COLOR_GLOW} 0%, ${AI_COLOR_SOFT} 58%, transparent 74%)`,
        }}
        animate={
          active
            ? { scale: [1, 1.07, 1], opacity: primary ? [0.8, 1, 0.8] : [0.5, 0.7, 0.5] }
            : { opacity: 0.4 }
        }
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Two counter-rotating dashed rings to signal orchestration */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-2 border-dashed"
        style={{ borderColor: 'rgba(76, 141, 255, 0.3)' }}
        animate={active ? { rotate: 360 } : {}}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full border border-dashed"
        style={{ borderColor: 'rgba(76, 141, 255, 0.18)' }}
        animate={active ? { rotate: -360 } : {}}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orb body */}
      <div
        className="relative flex h-[84%] w-[84%] flex-col items-center justify-center gap-2.5 rounded-full glass-bright"
        style={{
          borderColor: 'rgba(76, 141, 255, 0.4)',
          boxShadow: `0 0 40px ${AI_COLOR_GLOW}, 0 10px 50px rgba(76, 141, 255, 0.12)`,
        }}
      >
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: AI_COLOR_SOFT, color: AI_COLOR }}
        >
          <SparkIcon size={30} />
        </span>
        <p className="font-display text-[1.35rem] font-semibold leading-none text-text">
          AI Agent
        </p>
        <p
          className="px-8 text-center font-mono text-[0.64rem] uppercase tracking-widest leading-relaxed"
          style={{ color: AI_COLOR }}
        >
          Orchestrates the work
        </p>
      </div>
    </button>
  )
}
