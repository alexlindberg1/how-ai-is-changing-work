import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AI_COLOR, AI_COLOR_GLOW, AI_COLOR_SOFT } from '../workModel/stageLayout'
import {
  GOAL_TEXT,
  SCRIPT_TICK_MS,
  loopNodes,
  loopScript,
  type LoopNodeId,
} from './loopScript'

interface AgenticLoopPanelProps {
  /** Loop nodes + goal are visible. */
  visible: boolean
  /** The scripted business example is playing. */
  running: boolean
  /** Include the human-review beat and show the review branch card. */
  includeReview: boolean
}

/** Positions of the four loop nodes on the square stage, clockwise from top. */
const NODE_POS: Record<LoopNodeId, string> = {
  think: 'left-1/2 top-[7%] -translate-x-1/2 -translate-y-1/2',
  act: 'left-[93%] top-1/2 -translate-x-1/2 -translate-y-1/2',
  observe: 'left-1/2 top-[93%] -translate-x-1/2 -translate-y-1/2',
  adjust: 'left-[7%] top-1/2 -translate-x-1/2 -translate-y-1/2',
}

function PersonIcon({ size = 15 }: { size?: number }) {
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
 * The right half of Slide 4: the agentic loop. Think → Act → Observe → Adjust
 * around a ring (in the Slide 3 AI-blue motion language), with a concrete
 * business example narrated beat-by-beat in the center, plus the two ways a
 * pass can resolve: human review (exceptions) or a finished recommendation.
 */
export function AgenticLoopPanel({ visible, running, includeReview }: AgenticLoopPanelProps) {
  const script = useMemo(
    () => (includeReview ? loopScript : loopScript.filter((s) => s.node !== 'review')),
    [includeReview],
  )

  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setTick((t) => t + 1), SCRIPT_TICK_MS)
    return () => window.clearInterval(id)
  }, [running])

  const beat = running ? script[tick % script.length] : null
  const activeNode = beat?.node ?? null

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Goal card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
        transition={{ duration: 0.5 }}
        className="flex w-full items-center gap-3 rounded-xl glass-bright px-4 py-3"
        style={{
          borderColor: 'rgba(76, 141, 255, 0.4)',
          boxShadow: `0 0 24px ${AI_COLOR_GLOW}`,
        }}
      >
        <span
          className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em]"
          style={{ background: AI_COLOR_SOFT, color: AI_COLOR }}
        >
          Goal
        </span>
        <p className="min-w-0 font-display text-[0.98rem] font-medium leading-snug text-text">
          {GOAL_TEXT}
        </p>
      </motion.div>

      {/* Loop stage */}
      <div className="relative aspect-square w-[clamp(250px,23vw,330px)]">
        {/* Ring */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <motion.circle
            cx="100"
            cy="100"
            r="86"
            fill="none"
            stroke="rgba(76, 141, 255, 0.3)"
            strokeWidth="1.6"
            strokeDasharray="4 6"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
          {/* Direction arrowheads at the quarter marks */}
          {visible &&
            [45, 135, 225, 315].map((deg) => (
              <path
                key={deg}
                d="M -4 -3.5 L 3 0 L -4 3.5"
                fill="none"
                stroke="rgba(76, 141, 255, 0.45)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={`rotate(${deg} 100 100) translate(186 100) rotate(90)`}
              />
            ))}
          {/* Orbiting packet — continuous motion implies iteration */}
          {running && (
            <circle cx="100" cy="14" r="4" fill={AI_COLOR}>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 100 100"
                to="360 100 100"
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </svg>

        {/* Loop nodes */}
        {loopNodes.map((node, i) => {
          const isActive = activeNode === node.id
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
              transition={{ duration: 0.45, delay: visible ? i * 0.08 : 0 }}
              className={`absolute ${NODE_POS[node.id]} rounded-full border px-4 py-2 font-display text-[0.95rem] font-medium transition-all duration-300 ${
                isActive ? 'glass-bright' : 'glass'
              }`}
              style={
                isActive
                  ? {
                      borderColor: 'rgba(76, 141, 255, 0.55)',
                      color: AI_COLOR,
                      boxShadow: `0 0 22px ${AI_COLOR_GLOW}`,
                    }
                  : { color: 'var(--color-text-muted)' }
              }
            >
              {node.label}
            </motion.div>
          )
        })}

        {/* Narration caption in the center of the ring */}
        <div className="absolute inset-[22%] flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {beat && (
              <motion.div
                key={tick}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className="font-mono text-[0.6rem] uppercase tracking-[0.14em]"
                  style={{ color: AI_COLOR }}
                >
                  Pass {beat.pass}
                </span>
                <p className="font-display text-[0.98rem] font-medium leading-snug text-text">
                  {beat.text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {visible && !running && (
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-dim">
              Iterates until done
            </p>
          )}
        </div>
      </div>

      {/* How a pass resolves: exception → human, otherwise → outcome */}
      <div className="flex w-full items-stretch justify-center gap-3">
        {includeReview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 transition-all duration-300 ${
              activeNode === 'review' ? 'glass-bright border-accent/50 glow-accent' : 'glass border-accent/25'
            }`}
          >
            {activeNode === 'review' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[0.62rem] font-bold text-white shadow-md"
              >
                ✓
              </motion.span>
            )}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <PersonIcon />
            </span>
            <div className="text-left">
              <p className="font-display text-[0.9rem] font-semibold leading-tight text-text">
                Human Review
              </p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-text-dim">
                Exceptions & judgment
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 transition-all duration-300 ${
            activeNode === 'complete' ? 'glass-bright' : 'glass'
          }`}
          style={
            activeNode === 'complete'
              ? { borderColor: 'rgba(76, 141, 255, 0.55)', boxShadow: `0 0 22px ${AI_COLOR_GLOW}` }
              : { borderColor: 'rgba(76, 141, 255, 0.22)' }
          }
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.85rem] font-bold"
            style={{ background: AI_COLOR_SOFT, color: AI_COLOR }}
          >
            ✓
          </span>
          <div className="text-left">
            <p className="font-display text-[0.9rem] font-semibold leading-tight text-text">
              Outcome
            </p>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-text-dim">
              Recommended next steps
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
