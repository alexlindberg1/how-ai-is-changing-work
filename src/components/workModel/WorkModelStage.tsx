import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { StageTile } from './StageTile'
import { HumanHub } from './HumanHub'
import { CompletionFlyoff } from './CompletionFlyoff'
import {
  RELAY_CYCLE,
  RELAY_STAGGER,
  RELAY_TRAVEL,
  artifacts,
  systems,
  type ZoneId,
} from './stageLayout'

interface WorkModelStageProps {
  active?: boolean
}

interface Pt {
  x: number
  y: number
}

interface Geometry {
  w: number
  h: number
  inbound: string[]
  outbound: string[]
}

/** Horizontal-ease cubic between two points. */
function curve(a: Pt, b: Pt) {
  const mx = (a.x + b.x) / 2
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} C ${mx.toFixed(1)} ${a.y.toFixed(1)}, ${mx.toFixed(1)} ${b.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
}

export function WorkModelStage({ active = true }: WorkModelStageProps) {
  const [activeZone, setActiveZone] = useState<ZoneId | null>(null)
  const [geo, setGeo] = useState<Geometry | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLButtonElement>(null)
  const systemRefs = useRef<Array<HTMLDivElement | null>>([])
  const artifactRefs = useRef<Array<HTMLDivElement | null>>([])

  const measure = useCallback(() => {
    const container = containerRef.current
    const hub = hubRef.current
    if (!container || !hub) return

    const cr = container.getBoundingClientRect()
    const hr = hub.getBoundingClientRect()
    const rel = (r: DOMRect, edge: 'left' | 'right') => ({
      x: (edge === 'left' ? r.left : r.right) - cr.left,
      y: r.top - cr.top + r.height / 2,
    })

    const hubLeft = { x: hr.left - cr.left + hr.width * 0.06, y: hr.top - cr.top + hr.height / 2 }
    const hubRight = { x: hr.right - cr.left - hr.width * 0.06, y: hr.top - cr.top + hr.height / 2 }

    const inbound = systemRefs.current
      .filter(Boolean)
      .map((el) => curve(rel(el!.getBoundingClientRect(), 'right'), hubLeft))

    const outbound = artifactRefs.current
      .filter(Boolean)
      .map((el) => curve(hubRight, rel(el!.getBoundingClientRect(), 'left')))

    setGeo({ w: cr.width, h: cr.height, inbound, outbound })
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

  const handleZone = useCallback((zone: ZoneId) => {
    setActiveZone((prev) => (prev === zone ? null : zone))
  }, [])

  const systemsHighlighted = activeZone === 'systems'
  const humansHighlighted = activeZone === 'humans'
  const artifactsHighlighted = activeZone === 'artifacts'

  const travelFrac = RELAY_TRAVEL / RELAY_CYCLE

  return (
    <div
      ref={containerRef}
      className="relative grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(230px,1fr)_minmax(90px,1.1fr)_auto_minmax(90px,1.1fr)_minmax(230px,1fr)] lg:gap-0"
    >
      {/* Connector overlay (measured pixel paths) */}
      {geo && (
        <svg
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          aria-hidden="true"
        >
          {[...geo.inbound, ...geo.outbound].map((d, i) => (
            <path
              key={`line-${i}`}
              d={d}
              fill="none"
              stroke="rgba(201, 85, 85, 0.2)"
              strokeWidth="1.4"
              strokeDasharray="4 5"
            />
          ))}

          {/* Inbound: continuous stream gathering into the hub */}
          {active &&
            geo.inbound.map((d, i) => {
              const dur = 2.6 + (i % 3) * 0.5
              return (
                <circle key={`in-${i}`} r="4.5" fill="#c95555" opacity="0">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} begin={`${i * 0.7}s`} />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.88;1"
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.7}s`}
                  />
                </circle>
              )
            })}

          {/* Outbound: one packet per artifact on the shared relay clock */}
          {active &&
            geo.outbound.map((d, i) => (
              <circle key={`out-${i}`} r="6" fill="#c95555" opacity="0">
                <animateMotion
                  dur={`${RELAY_CYCLE}s`}
                  repeatCount="indefinite"
                  path={d}
                  calcMode="linear"
                  keyPoints="0;1;1"
                  keyTimes={`0;${travelFrac};1`}
                  begin={`${i * RELAY_STAGGER}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0;0"
                  keyTimes={`0;0.02;${Math.max(travelFrac - 0.01, 0.03)};${travelFrac};1`}
                  dur={`${RELAY_CYCLE}s`}
                  repeatCount="indefinite"
                  begin={`${i * RELAY_STAGGER}s`}
                />
              </circle>
            ))}
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

      {/* Human hub */}
      <div className="relative z-10 flex justify-center">
        <HumanHub
          circleRef={hubRef}
          highlighted={humansHighlighted}
          active={active}
          onClick={() => handleZone('humans')}
        />
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
          The outputs people assemble.
        </p>
        <div className="relative flex flex-col gap-3">
          {artifacts.map((art, i) => (
            <motion.div
              key={art.id}
              ref={(el) => {
                artifactRefs.current[i] = el
              }}
              animate={
                active
                  ? {
                      scale: [1, 1, 1.05, 1],
                      boxShadow: [
                        '0 0 0px rgba(201,85,85,0)',
                        '0 0 0px rgba(201,85,85,0)',
                        '0 0 24px rgba(201,85,85,0.45)',
                        '0 0 0px rgba(201,85,85,0)',
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 0.9,
                times: [0, 0.05, 0.4, 1],
                repeat: Infinity,
                repeatDelay: RELAY_CYCLE - 0.9,
                delay: i * RELAY_STAGGER + RELAY_TRAVEL - 0.15,
              }}
              className="rounded-xl"
            >
              <StageTile label={art.label} icon={art.icon} highlighted={artifactsHighlighted} />
            </motion.div>
          ))}
          <CompletionFlyoff active={active} />
        </div>
      </button>
    </div>
  )
}
