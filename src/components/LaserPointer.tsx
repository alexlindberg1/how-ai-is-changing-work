import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'

interface Pulse {
  id: number
  x: number
  y: number
}

/**
 * Presentation laser pointer. Toggle with "L".
 * Hides the native cursor and replaces it with a glowing red dot;
 * clicking emits a pulse ring to draw attention.
 */
export function LaserPointer() {
  const [active, setActive] = useState(false)
  const [pulses, setPulses] = useState<Pulse[]>([])
  const pulseId = useRef(0)
  // Keep last known pointer so toggling on never leaves the dot off-screen.
  const lastPos = useRef({ x: 0, y: 0 })

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const trailX = useSpring(x, { stiffness: 900, damping: 55 })
  const trailY = useSpring(y, { stiffness: 900, damping: 55 })

  // Always track the pointer so activation can jump to the real cursor.
  useEffect(() => {
    const track = (e: PointerEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY }
      if (active) {
        x.set(e.clientX)
        y.set(e.clientY)
      }
    }
    window.addEventListener('pointermove', track)
    return () => window.removeEventListener('pointermove', track)
  }, [active, x, y])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      if (e.key === 'l' || e.key === 'L') {
        e.preventDefault()
        setActive((prev) => {
          const next = !prev
          if (next) {
            const { x: px, y: py } = lastPos.current
            // Fall back to viewport center if we haven't seen a move yet.
            const cx = px || window.innerWidth / 2
            const cy = py || window.innerHeight / 2
            x.set(cx)
            y.set(cy)
          }
          return next
        })
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [x, y])

  useEffect(() => {
    if (!active) return

    const handleClick = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const id = pulseId.current++
      setPulses((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])
      window.setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== id))
      }, 700)
    }

    document.documentElement.classList.add('laser-active')
    window.addEventListener('pointerdown', handleClick)
    return () => {
      document.documentElement.classList.remove('laser-active')
      window.removeEventListener('pointerdown', handleClick)
    }
  }, [active, x, y])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[10000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {pulses.map((pulse) => (
            <motion.div
              key={pulse.id}
              className="absolute rounded-full border border-[rgba(201,85,85,0.55)]"
              style={{ left: pulse.x, top: pulse.y, x: '-50%', y: '-50%' }}
              initial={{ width: 16, height: 16, opacity: 0.7 }}
              animate={{ width: 72, height: 72, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}

          {/* Soft halo */}
          <motion.div
            className="absolute h-11 w-11 rounded-full"
            style={{
              left: trailX,
              top: trailY,
              x: '-50%',
              y: '-50%',
              background:
                'radial-gradient(circle, rgba(201, 85, 85, 0.28) 0%, rgba(201, 85, 85, 0.1) 45%, transparent 70%)',
            }}
          />
          {/* Core dot */}
          <motion.div
            className="absolute h-3 w-3 rounded-full"
            style={{
              left: trailX,
              top: trailY,
              x: '-50%',
              y: '-50%',
              background: 'radial-gradient(circle, #f0b0b0 0%, #c95555 55%, #a84444 100%)',
              boxShadow: '0 0 10px rgba(201, 85, 85, 0.55), 0 0 24px rgba(201, 85, 85, 0.28)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
