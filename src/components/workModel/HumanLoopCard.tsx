import { motion } from 'motion/react'

export interface ApprovalPulse {
  /** Full cycle length of the matching HiTL packet, in seconds. */
  dur: number
  /** When the packet first reaches the card, in seconds. */
  delay: number
}

interface HumanLoopCardProps {
  visible?: boolean
  active?: boolean
  /** Attached to the card so the AI↔human loop can measure its edges. */
  cardRef?: React.Ref<HTMLDivElement>
  /**
   * One entry per HiTL packet; a checkmark flashes on the card each time a
   * packet arrives, signalling human approval.
   */
  pulses?: ApprovalPulse[]
}

function PersonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * The secondary human-in-the-loop node on Slide 3. Deliberately smaller and
 * calmer than the AI hub — people are still important, but selectively, for
 * review, judgment and exceptions rather than doing all the connective work.
 */
const PULSE_DURATION = 1.1

export function HumanLoopCard({
  visible = true,
  active = true,
  cardRef,
  pulses = [],
}: HumanLoopCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.9 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -10,
        scale: visible ? 1 : 0.9,
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
    >
      {/* Soft warm halo — present but understated */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-24%] rounded-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(201,85,85,0.12) 0%, rgba(201,85,85,0.03) 60%, transparent 75%)',
        }}
        animate={visible && active ? { opacity: [0.5, 0.85, 0.5] } : { opacity: 0.4 }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        ref={cardRef}
        className="relative flex w-[clamp(190px,19vw,230px)] items-center gap-3 rounded-2xl border border-accent/30 glass px-4 py-3"
      >
        {/* Approval checkmark — flashes each time a HiTL packet arrives */}
        {visible &&
          active &&
          pulses.map((pulse, i) => (
            <motion.span
              key={`pulse-${i}`}
              aria-hidden="true"
              className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-accent font-bold text-[0.72rem] text-white shadow-md"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.15, 1, 0.6] }}
              transition={{
                duration: PULSE_DURATION,
                times: [0, 0.2, 0.75, 1],
                repeat: Infinity,
                repeatDelay: pulse.dur - PULSE_DURATION,
                delay: pulse.delay,
                ease: 'easeOut',
              }}
            >
              ✓
            </motion.span>
          ))}

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <PersonIcon size={18} />
        </span>
        <div className="min-w-0 text-left">
          <p className="font-display text-[1rem] font-semibold leading-tight text-text">
            Human in the Loop
          </p>
          <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] leading-relaxed text-text-dim">
            Review · Approve · Exceptions
          </p>
        </div>
      </div>
    </motion.div>
  )
}
