import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Initial Consultation',
    desc: 'We listen to understand your situation, assess the legal landscape, and identify the most effective course of action.',
  },
  {
    num: '02',
    title: 'Strategic Analysis',
    desc: 'Our team conducts rigorous legal research, evaluates precedents, and formulates a tailored strategy for your matter.',
  },
  {
    num: '03',
    title: 'Active Representation',
    desc: 'We execute the strategy with precision — whether in negotiation, mediation, or courtroom litigation.',
  },
  {
    num: '04',
    title: 'Resolution & Support',
    desc: 'We see your matter through to a favorable outcome and provide ongoing counsel to protect your interests.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" style={s.section}>
      {/* Radial glow */}
      <div style={s.glow} />

      <div style={s.container} ref={ref}>
        {/* Left — header + steps */}
        <div style={s.left}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: 52 }}
          >
            <span className="label">How We Work</span>
            <h2 style={s.heading}>
              A Process Built on <em style={s.italic}>Precision</em>
            </h2>
            <p style={s.subtitle}>
              Every engagement follows a structured approach designed to maximise outcomes while keeping you informed at every stage.
            </p>
          </motion.div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              style={s.step}
              initial={{ opacity: 0, x: -28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.13, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={s.stepLeft}>
                <div style={s.stepNum}>{step.num}</div>
                {i < steps.length - 1 && <div style={s.stepLine} />}
              </div>
              <div style={{ ...s.stepContent, paddingBottom: i < steps.length - 1 ? 36 : 0 }}>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right — image */}
        <motion.div
          style={s.right}
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={s.imgOuter}>
            <div style={s.imgWrap}>
              <img
                src="/N A ALI & COMPANY Advocates.jpg"
                alt="N.A. Ali & Company Advocates"
                style={s.img}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={s.imgOverlay} />
              <div style={s.imgCaption}>
                <div style={s.captionName}>N.A. ALI & COMPANY</div>
                <div style={s.captionSub}>Advocates & Legal Consultants</div>
              </div>
            </div>

            {/* Badge */}
            <motion.div
              style={s.badge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.75, duration: 0.6 }}
            >
              <span style={s.badgeNum}>20+</span>
              <span style={s.badgeLabel}>Years of{'\n'}Excellence</span>
            </motion.div>

            {/* Emerald corner accents */}
            <div style={s.cornerTR} />
            <div style={s.cornerBL} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const s = {
  section: {
    padding: '120px 0',
    background: '#101B2E',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: '20%',
    right: '-8%',
    width: 500,
    height: 500,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  container: {
    maxWidth: 1340,
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 3rem)',
    display: 'grid',
    gridTemplateColumns: '1fr 0.85fr',
    gap: 80,
    alignItems: 'start',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    fontWeight: 300,
    color: '#F0E8D8',
    lineHeight: 1.1,
    marginTop: 10,
    marginBottom: 16,
    fontStyle: 'normal',
  },
  italic: {
    fontStyle: 'italic',
    color: '#10B981',
  },
  subtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'rgba(240,232,216,0.5)',
    maxWidth: 480,
  },
  step: {
    display: 'flex',
    gap: 22,
    alignItems: 'flex-start',
  },
  stepLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNum: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '1px solid rgba(16,185,129,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.05rem',
    fontWeight: 600,
    color: '#10B981',
    flexShrink: 0,
    background: 'rgba(16,185,129,0.05)',
  },
  stepLine: {
    width: 1,
    minHeight: 32,
    flex: 1,
    background: 'rgba(16,185,129,0.15)',
    marginTop: 6,
  },
  stepContent: {
    flex: 1,
    paddingTop: 10,
  },
  stepTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.4rem',
    fontWeight: 400,
    color: '#F0E8D8',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  stepDesc: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 300,
    lineHeight: 1.65,
    color: 'rgba(240,232,216,0.5)',
  },
  right: {
    position: 'sticky',
    top: 100,
  },
  imgOuter: {
    position: 'relative',
  },
  imgWrap: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    aspectRatio: '3/4',
    boxShadow: '0 40px 80px rgba(0,0,0,0.45)',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    display: 'block',
    transition: 'transform 0.7s ease',
  },
  imgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, transparent 45%, rgba(6,11,20,0.78) 100%)',
    pointerEvents: 'none',
  },
  imgCaption: {
    position: 'absolute',
    bottom: 28,
    left: 28,
    zIndex: 2,
  },
  captionName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.1rem',
    fontWeight: 400,
    color: '#F0E8D8',
    letterSpacing: '0.08em',
  },
  captionSub: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#10B981',
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: 28,
    right: -20,
    background: 'linear-gradient(135deg, #0D7C5F 0%, #0a6a50 100%)',
    borderRadius: 12,
    padding: '20px 22px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 16px 40px rgba(13,124,95,0.4)',
    zIndex: 4,
  },
  badgeNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2rem',
    fontWeight: 600,
    color: '#fff',
    lineHeight: 1,
  },
  badgeLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.58rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 5,
    textAlign: 'center',
    whiteSpace: 'pre-line',
    lineHeight: 1.4,
  },
  cornerTR: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 50,
    height: 50,
    borderTop: '2px solid rgba(16,185,129,0.4)',
    borderRight: '2px solid rgba(16,185,129,0.4)',
    borderRadius: '0 12px 0 0',
    pointerEvents: 'none',
  },
  cornerBL: {
    position: 'absolute',
    bottom: -8,
    left: -8,
    width: 50,
    height: 50,
    borderBottom: '2px solid rgba(16,185,129,0.4)',
    borderLeft: '2px solid rgba(16,185,129,0.4)',
    borderRadius: '0 0 0 12px',
    pointerEvents: 'none',
  },
}
