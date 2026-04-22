import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const Cursor = () => {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const dotX = useSpring(mx, { stiffness: 900, damping: 55 })
  const dotY = useSpring(my, { stiffness: 900, damping: 55 })
  const ringX = useSpring(mx, { stiffness: 140, damping: 22 })
  const ringY = useSpring(my, { stiffness: 140, damping: 22 })

  useEffect(() => {
    const onMove = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return null

  return (
    <>
      {/* Inner dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999]"
      />
      {/* Outer ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 w-9 h-9 border border-gold/35 rounded-full pointer-events-none z-[9999]"
      />
    </>
  )
}

export default Cursor
