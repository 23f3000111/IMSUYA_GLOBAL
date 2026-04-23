import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 100, suffix: '+', label: 'Clients Advised', desc: 'Across Kenya and beyond' },
  { value: 6, suffix: '+', label: 'Practice Areas', desc: 'Comprehensive legal coverage' },
  { value: 10, suffix: '+', label: 'Years Experience', desc: 'Trusted corporate counsel' },
  { value: 100, suffix: '%', label: 'Client Dedication', desc: 'Professional case handling' },
]

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = target / (duration / 16)

    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span className="stat-number">
      {count}{suffix}
    </span>
  )
}

export default function TrustMetrics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      style={{
        background: '#FFFFFF',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top border gold */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #C9A227 30%, #E8D9A8 60%, transparent)' }} />

      {/* BG pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div className="section-wrap" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-label mb-4"
          >
            Our Impact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#0F172A',
              marginBottom: '16px',
            }}
          >
            Results That Speak for Themselves
          </motion.h2>
          <div style={{ transformOrigin: 'center' }} className="mb-6">
            <div className="gold-line-center" />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center group"
              style={{
                background: '#F8FAFC',
                borderRadius: '16px',
                padding: '40px 24px',
                border: '1px solid rgba(201,162,39,0.1)',
                transition: 'all 0.35s ease',
                cursor: 'default',
              }}
              whileHover={{
                background: '#0F172A',
                borderColor: 'rgba(201,162,39,0.3)',
                y: -6,
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              }}
            >
              <div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div style={{
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#111827',
                marginTop: '8px',
                marginBottom: '6px',
                transition: 'color 0.3s',
              }}
              className="group-hover:text-white"
              >
                {stat.label}
              </div>
              <div style={{
                fontFamily: 'Manrope',
                fontSize: '0.8rem',
                color: '#9CA3AF',
                lineHeight: 1.5,
              }}>
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '72px',
            background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
            borderRadius: '16px',
            padding: '48px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(201,162,39,0.15)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1.6rem', color: '#F8FAFC', marginBottom: '8px' }}>
              Ready to protect your legal interests?
            </div>
            <div style={{ color: 'rgba(248,250,252,0.55)', fontFamily: 'Manrope', fontSize: '0.95rem' }}>
              Join hundreds of satisfied clients who trust N.A. Ali Company & Advocates.
            </div>
          </div>
          <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>
            Book a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
