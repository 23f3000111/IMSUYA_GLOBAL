import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('reveal'), 300)
          setTimeout(() => { setPhase('done'); onComplete?.() }, 1200)
          return 100
        }
        return prev + Math.random() * 3 + 1
      })
    }, 30)
    return () => clearInterval(interval)
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      <motion.div style={s.overlay} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
        <motion.div style={s.center}>
          <motion.img
            src="/N A ALI LOGO.png"
            alt="N.A. Ali Logo"
            style={s.logo}
            animate={{ scale: phase === 'reveal' ? 0.6 : 1, opacity: phase === 'reveal' ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.p style={s.firmName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'loading' ? 1 : 0, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            N.A. ALI & COMPANY
          </motion.p>
          <motion.div style={s.progressTrack}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'loading' ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div style={s.progressBar} animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ ease: 'linear' }} />
          </motion.div>
        </motion.div>

        {phase === 'reveal' && (
          <>
            <motion.div style={{ ...s.wipe, top: 0 }} initial={{ height: '50%' }} animate={{ height: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }} />
            <motion.div style={{ ...s.wipe, bottom: 0 }} initial={{ height: '50%' }} animate={{ height: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }} />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

const s = {
  overlay: { position: 'fixed', inset: 0, zIndex: 10000, background: '#101B2E', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  center: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' },
  logo: { width: 72, height: 72, objectFit: 'contain' },
  firmName: { fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.35em', color: 'rgba(240,232,216,0.4)', textTransform: 'uppercase' },
  progressTrack: { width: 180, height: 1, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' },
  progressBar: { height: '100%', background: '#0D7C5F' },
  wipe: { position: 'absolute', left: 0, width: '100%', background: '#101B2E', zIndex: 10001 },
}
