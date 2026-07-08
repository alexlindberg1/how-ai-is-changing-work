import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StageTile } from './StageTile'
import { AIHub } from './AIHub'
import { HumanLoopCard } from './HumanLoopCard'
import { CapabilityChip } from './CapabilityChip'
import {
  AI_COLOR,
  AI_DIRECT_FLOWS,
  AI_HITL_FLOWS,
  artifacts,
  capabilities,
  systems,
  type ZoneId,
} from './stageLayout'

interface AiConnectionStageProps {
  /** Drives the progressive reveal (see Slide 3 step map). */
  step: number
}

interface Pt {
  x: number
  y: number
}

interface Geometry {
  w: number
  h: number
  railsIn: string[]
  railsOut: string[]
  railHuman: string | null
  directPaths: string[]
  hitlPaths: string[]
}

/** Smooth cubic segment between two points, easing along the dominant axis. */
function seg(a: Pt, b: Pt) {
  const dx = Math.abs(b.x - a.x)
  const dy = Math.abs(b.y - a.y)
  if (dx >= dy) {
    const mx = (a.x + b.x) / 2
    return `C ${mx.toFixed(1)} ${a.y.toFixed(1)}, ${mx.toFixed(1)} ${b.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
  }
  const my = (a.y + b.y) / 2
  return `C ${a.x.toFixed(1)} ${my.toFixed(1)}, ${b.x.toFixed(1)} ${my.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
}

/** Single curve between two points (for the faint connector rails). */
function curve(a: Pt, b: Pt) {
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} ${seg(a, b)}`
}

/** Straight segment — used to cross behind the AI orb where the dot is hidden. */
function line(b: Pt) {
  return `L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
}

/**
 * Shared clock for the human-in-the-loop packets so the approval checkmark on
 * the human card flashes right as each red dot arrives there. With paced
 * animateMotion the dot reaches the human card roughly halfway along the
 * system → AI → human → AI → action path.
 */
const hitlDur = (i: number) => 6.6 + i * 0.5
const hitlBegin = (i: number) => i * 1.6
const HITL_ARRIVAL_FRAC = 0.5

/**
 * Slide 3 stage — the same three-layer model as Slide 2, but the orchestration
 * role has moved from people to AI. The AI hub now sits at the center (inheriting
 * the human orb's visual language), people become a selective human-in-the-loop
 * node, and packets branch two ways:
 *   Pattern A: system → AI → action            (AI acts directly, blue)
 *   Pattern B: system → AI → human → AI → action (human review, warm red)
 */
export function AiConnectionStage({ step }: AiConnectionStageProps) {
  const [activeZone, setActiveZone] = useState<ZoneId | null>(null)
  const [geo, setGeo] = useState<Geometry | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const aiRef = useRef<HTMLButtonElement>(null)
  const humanRef = useRef<HTMLDivElement>(null)
  const systemRefs = useRef<Array<HTMLDivElement | null>>([])
  const artifactRefs = useRef<Array<HTMLDivElement | null>>([])

  const showStage = step >= 1
  const aiPrimary = step >= 2
  const humanVisible = step >= 2
  const capsVisible = step >= 2
  const directFlows = step >= 3
  const hitlFlows = step >= 4

  const measure = useCallback(() => {
    const container = containerRef.current
    const ai = aiRef.current
    if (!container || !ai) return

    const cr = container.getBoundingClientRect()
    const rel = (r: DOMRect, edge: 'left' | 'right') => ({
      x: (edge === 'left' ? r.left : r.right) - cr.left,
      y: r.top - cr.top + r.height / 2,
    })
    const center = (r: DOMRect) => ({
      x: r.left - cr.left + r.width / 2,
      y: r.top - cr.top + r.height / 2,
    })

    const ar = ai.getBoundingClientRect()
    const aiCenter = center(ar)
    const aiLeft = { x: ar.left - cr.left + ar.width * 0.1, y: aiCenter.y }
    const aiRight = { x: ar.right - cr.left - ar.width * 0.1, y: aiCenter.y }

    const sysPts = systemRefs.current.map((el) =>
      el ? rel(el.getBoundingClientRect(), 'right') : null,
    )
    const artPts = artifactRefs.current.map((el) =>
      el ? rel(el.getBoundingClientRect(), 'left') : null,
    )

    const railsIn = sysPts.filter(Boolean).map((p) => curve(p!, aiLeft))
    const railsOut = artPts.filter(Boolean).map((p) => curve(aiRight, p!))

    // Packet paths reuse the exact same curve segments as the rails so the
    // dots visibly ride the dotted lines; the orb interior is crossed with
    // straight segments that stay hidden behind the orb (as on Slide 2).
    let railHuman: string | null = null
    let hitlPaths: string[] = []
    const humanEl = humanRef.current
    if (humanEl) {
      const hc = center(humanEl.getBoundingClientRect())
      railHuman = curve(aiCenter, hc)
      hitlPaths = AI_HITL_FLOWS.map(({ sys, art }) => {
        const s = sysPts[sys]
        const a = artPts[art]
        if (!s || !a) return null
        return [
          curve(s, aiLeft),
          line(aiCenter),
          seg(aiCenter, hc),
          seg(hc, aiCenter),
          line(aiRight),
          seg(aiRight, a),
        ].join(' ')
      }).filter(Boolean) as string[]
    }

    const directPaths = AI_DIRECT_FLOWS.map(({ sys, art }) => {
      const s = sysPts[sys]
      const a = artPts[art]
      if (!s || !a) return null
      return [curve(s, aiLeft), line(aiRight), seg(aiRight, a)].join(' ')
    }).filter(Boolean) as string[]

    setGeo({ w: cr.width, h: cr.height, railsIn, railsOut, railHuman, directPaths, hitlPaths })
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', measure)
    const settle = window.setTimeout(measure, 350)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.clearTimeout(settle)
    }
  }, [measure])

  // The AI hub, human node and chips change layout height as they reveal, so
  // re-measure the connector geometry when those steps toggle.
  useEffect(() => {
    measure()
    const settle = window.setTimeout(measure, 420)
    return () => window.clearTimeout(settle)
  }, [measure, aiPrimary, humanVisible, capsVisible])

  const handleZone = useCallback((zone: ZoneId) => {
    setActiveZone((prev) => (prev === zone ? null : zone))
  }, [])

  const systemsHighlighted = activeZone === 'systems'
  const artifactsHighlighted = activeZone === 'artifacts'

  return (
    <div
      ref={containerRef}
      className="relative grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(230px,1fr)_minmax(70px,0.9fr)_auto_minmax(70px,0.9fr)_minmax(230px,1fr)] lg:gap-0"
    >
      {/* Connector overlay — rails and packets sit behind the cards, so dots
          duck behind the AI orb exactly like they do on Slide 2. */}
      {geo && (
        <svg
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          aria-hidden="true"
        >
          {/* Blue rails: systems → AI → actions */}
          {showStage &&
            [...geo.railsIn, ...geo.railsOut].map((d, i) => (
              <path
                key={`rail-${i}`}
                d={d}
                fill="none"
                stroke="rgba(76, 141, 255, 0.22)"
                strokeWidth="1.4"
                strokeDasharray="4 6"
              />
            ))}

          {/* Warm rail: AI ↔ human-in-the-loop */}
          {hitlFlows && geo.railHuman && (
            <path
              d={geo.railHuman}
              fill="none"
              stroke="rgba(201, 85, 85, 0.3)"
              strokeWidth="1.6"
              strokeDasharray="3 5"
            />
          )}
          {/* Pattern A — AI acts directly (blue packets straight through AI) */}
          {directFlows &&
            geo.directPaths.map((d, i) => {
              const dur = 4.4 + i * 0.4
              return (
                <circle key={`direct-${i}`} r="5.5" fill={AI_COLOR} opacity="0">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} begin={`${i * 1.1}s`} />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;1;0"
                    keyTimes="0;0.06;0.5;0.92;1"
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                    begin={`${i * 1.1}s`}
                  />
                </circle>
              )
            })}

          {/* Pattern B — AI routes to human, then back to AI, then to action */}
          {hitlFlows &&
            geo.hitlPaths.map((d, i) => {
              const dur = hitlDur(i)
              return (
                <circle key={`hitl-${i}`} r="6" fill="#c95555" opacity="0">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} begin={`${hitlBegin(i)}s`} />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;1;0"
                    keyTimes="0;0.05;0.5;0.94;1"
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                    begin={`${hitlBegin(i)}s`}
                  />
                </circle>
              )
            })}
        </svg>
      )}

      {/* Systems of Record */}
      <button
        type="button"
        onClick={() => handleZone('systems')}
        aria-pressed={systemsHighlighted}
        aria-label="Highlight Systems of Record"
        className="relative z-10 cursor-pointer border-none bg-transparent p-0 text-left"
      >
        <p className="mb-1 font-mono text-kicker uppercase tracking-[0.14em] text-text-dim">
          Systems of Record
        </p>
        <p className="mb-4 font-display text-[0.95rem] text-text-muted">
          Separate tools. Data lives here.
        </p>
        <div className="flex flex-col gap-3">
          {systems.map((sys, i) => (
            <div
              key={sys.id}
              ref={(el) => {
                systemRefs.current[i] = el
              }}
            >
              <StageTile label={sys.label} icon={sys.icon} highlighted={systemsHighlighted} />
            </div>
          ))}
        </div>
      </button>

      <div aria-hidden="true" className="hidden lg:block" />

      {/* AI orchestration layer (with the human in the loop) */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <p
          className="font-mono text-kicker uppercase tracking-[0.14em] transition-colors"
          style={{ color: aiPrimary ? AI_COLOR : 'var(--color-text-dim)' }}
        >
          {aiPrimary ? 'AI Connection Layer' : 'The Connection Layer'}
        </p>

        <HumanLoopCard
          cardRef={humanRef}
          visible={humanVisible}
          active={showStage}
          pulses={
            hitlFlows
              ? AI_HITL_FLOWS.map((_, i) => ({
                  dur: hitlDur(i),
                  delay: hitlBegin(i) + hitlDur(i) * HITL_ARRIVAL_FRAC,
                }))
              : []
          }
        />

        <AIHub
          circleRef={aiRef}
          active={showStage}
          primary={aiPrimary}
          onClick={() => handleZone('humans')}
        />

        <div className="flex max-w-[clamp(240px,28vw,380px)] flex-wrap justify-center gap-2">
          {capabilities.map((cap, i) => (
            <CapabilityChip
              key={cap}
              label={cap}
              index={i}
              visible={capsVisible}
              active={showStage}
            />
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="hidden lg:block" />

      {/* Artifacts + Action */}
      <button
        type="button"
        onClick={() => handleZone('artifacts')}
        aria-pressed={artifactsHighlighted}
        aria-label="Highlight Artifacts and Action"
        className="relative z-10 cursor-pointer border-none bg-transparent p-0 text-left lg:text-right"
      >
        <p className="mb-1 font-mono text-kicker uppercase tracking-[0.14em] text-text-dim">
          Artifacts + Action
        </p>
        <p className="mb-4 font-display text-[0.95rem] text-text-muted">
          The outputs, assembled faster.
        </p>
        <div className="flex flex-col gap-3">
          {artifacts.map((art, i) => (
            <div
              key={art.id}
              ref={(el) => {
                artifactRefs.current[i] = el
              }}
            >
              <StageTile label={art.label} icon={art.icon} highlighted={artifactsHighlighted} />
            </div>
          ))}
        </div>
      </button>
    </div>
  )
}
