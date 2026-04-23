import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const Cursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 }
  const trailConfig = { damping: 20, stiffness: 120, mass: 0.8 }

  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)
  const trailSpringX = useSpring(trailX, trailConfig)
  const trailSpringY = useSpring(trailY, trailConfig)

  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const enter = () => setHovering(true)
    const leave = () => setHovering(false)
    const down = () => setClicking(true)
    const up = () => setClicking(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    const obs = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    })
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      obs.disconnect()
    }
  }, [cursorX, cursorY, trailX, trailY, visible])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 44 : clicking ? 24 : 36,
            height: hovering ? 44 : clicking ? 24 : 36,
            borderColor: hovering ? '#C9A227' : 'rgba(201,162,39,0.5)',
            opacity: clicking ? 0.4 : 0.7,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            borderRadius: '50%',
            border: '1.5px solid rgba(201,162,39,0.5)',
            background: 'transparent',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: clicking ? 6 : hovering ? 10 : 8,
            height: clicking ? 6 : hovering ? 10 : 8,
            background: hovering ? '#C9A227' : '#E8D9A8',
            scale: clicking ? 0.6 : 1,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{ borderRadius: '50%' }}
        />
      </motion.div>
    </>
  )
}

export default Cursor
