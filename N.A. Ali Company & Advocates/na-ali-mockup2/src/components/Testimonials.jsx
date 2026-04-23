import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "N.A. Ali & Company provided exceptional counsel during our corporate restructuring. Their strategic insight and meticulous attention to detail resulted in an outcome that exceeded our expectations.",
    author: 'Ahmed Raza',
    role: 'CEO, Raza Holdings',
  },
  {
    quote: "The team's dedication to my family law case was remarkable. They handled a deeply personal matter with professionalism, empathy, and unwavering commitment to the best possible result.",
    author: 'Sana Malik',
    role: 'Private Client',
  },
  {
    quote: "We have relied on N.A. Ali for all our commercial litigation needs. Their courtroom presence is commanding, and they consistently deliver favorable judgments for our organization.",
    author: 'Faisal Khan',
    role: 'Director, KF Group',
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx(i => (i + 1) % testimonials.length)

  const t = testimonials[idx]

  return (
    <section id="testimonials" style={s.section}>
      <div style={s.container} ref={ref}>
        <motion.div
          style={s.inner}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Left */}
          <div style={s.left}>
            <span className="label">Client Voices</span>
            <h2 style={s.heading}>
              Trusted by Those <br />
              Who <span style={s.italic}>Matter</span>
            </h2>
            <p style={s.subtitle}>Our clients' success is the ultimate measure of our work.</p>
            <div style={s.arrows}>
              <button onClick={prev} style={s.arrowBtn} aria-label="Previous"><ChevronLeft size={20} /></button>
              <button onClick={next} style={s.arrowBtn} aria-label="Next"><ChevronRight size={20} /></button>
              <span style={s.counter}>{String(idx + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Right — testimonial */}
          <div style={s.right}>
            <Quote size={36} style={{ color: 'rgba(13,124,95,0.18)', marginBottom: 8 }} />
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p style={s.quote}>{t.quote}</p>
                <div style={s.authorRow}>
                  <div style={s.authorDot} />
                  <div>
                    <span style={s.authorName}>{t.author}</span>
                    <span style={s.authorRole}>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const s = {
  section: {
    padding: '120px 0',
    background: '#F3EDE3',
  },
  container: {
    maxWidth: 1340,
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 3rem)',
  },
  inner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.3fr',
    gap: 80,
    alignItems: 'start',
    padding: '60px 64px',
    background: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(0,0,0,0.08)',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    fontWeight: 300,
    color: '#1C1C1C',
    lineHeight: 1.15,
  },
  italic: { fontStyle: 'italic', color: '#10B981' },
  subtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 300,
    lineHeight: 1.6,
    color: '#6B6B6B',
  },
  arrows: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  arrowBtn: {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: '1px solid rgba(0,0,0,0.15)',
    color: '#1A1A1A',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  counter: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 400,
    color: '#9A9A9A',
    marginLeft: 8,
    letterSpacing: '0.1em',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
  },
  quote: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.35rem',
    fontWeight: 300,
    fontStyle: 'italic',
    lineHeight: 1.6,
    color: '#2D2D2D',
    marginBottom: 32,
  },
  authorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  authorDot: {
    width: 4,
    height: 36,
    background: '#0D7C5F',
  },
  authorName: {
    display: 'block',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#1A1A1A',
  },
  authorRole: {
    display: 'block',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 400,
    color: '#9A9A9A',
    marginTop: 2,
  },
}
