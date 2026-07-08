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

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Slight lag makes the dot feel like a physical pointer
  const trailX = useSpring(x, { stiffness: 900, damping: 55 })
  const trailY = useSpring(y, { stiffness: 900, damping: 55 })

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      if (e.key === 'l' || e.key === 'L') {
        setActive((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (!active) return

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
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
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerdown', handleClick)
    return () => {
      document.documentElement.classList.remove('laser-active')
      window.removeEventListener('pointermove', handleMove)
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
              className="absolute rounded-full border border-[rgba(201,85,85,0.5)]"
              style={{ left: pulse.x, top: pulse.y, x: '-50%', y: '-50%' }}
              initial={{ width: 14, height: 14, opacity: 0.6 }}
              animate={{ width: 64, height: 64, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}

          {/* Soft halo */}
          <motion.div
            className="absolute h-9 w-9 rounded-full"
            style={{
              left: trailX,
              top: trailY,
              x: '-50%',
              y: '-50%',
              background:
                'radial-gradient(circle, rgba(201, 85, 85, 0.18) 0%, rgba(201, 85, 85, 0.07) 50%, transparent 70%)',
            }}
          />
          {/* Core dot */}
          <motion.div
            className="absolute h-2.5 w-2.5 rounded-full"
            style={{
              left: trailX,
              top: trailY,
              x: '-50%',
              y: '-50%',
              background: 'radial-gradient(circle, #e89a9a 0%, #c95555 60%, #b34a4a 100%)',
              boxShadow: '0 0 8px rgba(201, 85, 85, 0.45), 0 0 20px rgba(201, 85, 85, 0.2)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
