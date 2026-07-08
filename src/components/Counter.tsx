import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'

interface CounterProps {
  value: number
  duration?: number
  suffix?: string
  className?: string
}

export function Counter({ value, duration = 1.5, suffix = '', className = '' }: CounterProps) {
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(spring, (v) => Math.round(v))
  const [shown, setShown] = useState(0)

  useEffect(() => {
    spring.set(value)
    const unsub = display.on('change', (v) => setShown(v))
    return unsub
  }, [value, spring, display])

  return (
    <motion.span className={className}>
      {shown}
      {suffix}
    </motion.span>
  )
}
