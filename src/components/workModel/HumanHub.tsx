import { motion } from 'motion/react'
import { humans } from './stageLayout'

interface HumanHubProps {
  highlighted?: boolean
  active?: boolean
  onClick?: () => void
  /** Attached to the circular button so connectors can measure its edges. */
  circleRef?: React.Ref<HTMLButtonElement>
}

function PersonIcon({ size = 14 }: { size?: number }) {
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

export function HumanHub({
  highlighted = false,
  active = true,
  onClick,
  circleRef,
}: HumanHubProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-mono text-kicker uppercase tracking-[0.14em] text-accent">
        Human Connection Layer
      </p>

      <button
        ref={circleRef}
        type="button"
        onClick={onClick}
        aria-pressed={highlighted}
        aria-label="Highlight Human Connection Layer"
        className="relative flex aspect-square w-[clamp(260px,27vw,400px)] cursor-pointer items-center justify-center border-none bg-transparent p-0"
      >
        {/* Breathing glow halo */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-[-12%] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(201,85,85,0.14) 0%, rgba(201,85,85,0.03) 60%, transparent 75%)',
          }}
          animate={active ? { scale: [1, 1.07, 1], opacity: [0.7, 1, 0.7] } : { opacity: 0.5 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Rotating dashed ring */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-dashed border-accent/25"
          animate={active ? { rotate: 360 } : {}}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />

        {/* Hub body */}
        <div
          className={`relative flex h-[88%] w-[88%] flex-col items-center justify-center gap-3 rounded-full transition-colors duration-200 ${
            highlighted
              ? 'bg-accent text-white glow-accent'
              : 'glass-bright text-text glow-accent'
          }`}
        >
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              highlighted ? 'bg-white/20 text-white' : 'bg-accent/10 text-accent'
            }`}
          >
            <PersonIcon size={24} />
          </span>

          <div className="grid grid-cols-2 gap-2 px-7">
            {humans.map((role) => (
              <span
                key={role}
                className={`flex items-center justify-center rounded-full px-3 py-2 font-display text-[0.85rem] font-medium leading-none ${
                  highlighted ? 'bg-white/15 text-white' : 'bg-accent/[0.07] text-text'
                }`}
              >
                {role}
              </span>
            ))}
          </div>

          <p
            className={`px-9 text-center font-mono text-[0.68rem] uppercase tracking-widest leading-relaxed ${
              highlighted ? 'text-white/75' : 'text-text-dim'
            }`}
          >
            People bridge every system
          </p>
        </div>
      </button>
    </div>
  )
}
