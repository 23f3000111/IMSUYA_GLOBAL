import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ImageOff } from 'lucide-react'

const heroImages = ['/N A ALI & COMPANY Advocates.jpg',
]

export default function Hero() {
  const [imgIdx, setImgIdx] = useState(0)


  return (
    <section id="hero" style={s.section}>
      <div style={s.container}>
        {/* Left — text */}
        <div style={s.left}>
          <motion.div
            style={s.topRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <div style={s.glowDot} />
            <span style={s.topLabel}>ADVOCATES & LEGAL CONSULTANTS — SINCE 2005</span>
          </motion.div>

          <div style={s.headingWrap}>
            <motion.h1
              style={s.heading}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Counsel That
            </motion.h1>
            <motion.h1
              style={s.heading}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Commands <span style={s.italic}>Respect</span>
            </motion.h1>
          </div>

          <motion.p
            style={s.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            Delivering decisive legal strategies across corporate, civil, family, and criminal law — with the precision and discretion your case demands.
          </motion.p>

          <motion.div
            style={s.ctaWrap}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 0.8 }}
          >
            <a href="#contact" style={s.btnFill}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a6a50'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(13,124,95,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0D7C5F'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <span>Schedule Consultation</span>
              <ArrowUpRight size={16} />
            </a>
            <a href="#expertise" style={s.btnGhost}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0D7C5F'; e.currentTarget.style.color = '#0D7C5F' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#F0E8D8' }}
            >
              <span>Our Expertise</span>
            </a>
          </motion.div>
        </div>

        {/* Right — image */}
        <motion.div
          style={s.right}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={s.imgWrap}>
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIdx}
                src={heroImages[imgIdx]}
                alt="Natasha A. Ali"
                style={s.img}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>
            {/* Emerald corner accent */}
            <div style={s.cornerTR} />
            <div style={s.cornerBL} />
            {/* Image dots */}
            <div style={s.dotsWrap}>
              {heroImages.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)} style={{
                  width: imgIdx === i ? 20 : 6, height: 6, borderRadius: 3,
                  background: imgIdx === i ? '#0D7C5F' : 'rgba(255,255,255,0.25)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                }} aria-label={`Image ${i+1}`} />
              ))}
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            style={s.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            <span style={s.badgeNum}>20+</span>
            <span style={s.badgeLabel}>Years of Legal Excellence</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={s.scrollInd}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <motion.div
          style={s.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span style={s.scrollText}>SCROLL</span>
      </motion.div>

      <div style={s.borderBottom} />
    </section>
  )
}

const s = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    background: '#101B2E',
  },
  container: {
    maxWidth: 1340,
    margin: '0 auto',
    padding: '140px clamp(1.5rem, 4vw, 3rem) 80px',
    width: '100%',
    position: 'relative',
    zIndex: 2,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 60,
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  glowDot: {
    width: 8, height: 8, borderRadius: '50%',
    background: '#0D7C5F',
    boxShadow: '0 0 8px rgba(13,124,95,0.4)',
  },
  topLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 500,
    letterSpacing: '0.25em',
    color: 'rgba(240,232,216,0.5)',
  },
  headingWrap: { marginBottom: 8 },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
    fontWeight: 300,
    lineHeight: 1.05,
    color: '#F0E8D8',
    letterSpacing: '-0.02em',
  },
  italic: {
    fontStyle: 'italic',
    color: '#0D7C5F',
  },
  subtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'rgba(240,232,216,0.6)',
    maxWidth: 460,
  },
  ctaWrap: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    marginTop: 8,
  },
  btnFill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#fff',
    background: '#0D7C5F',
    padding: '16px 32px',
    borderRadius: 6,
    textDecoration: 'none',
    transition: 'all 0.35s',
  },
  btnGhost: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#F0E8D8',
    background: 'transparent',
    padding: '16px 32px',
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 6,
    transition: 'all 0.35s',
  },
  right: {
    position: 'relative',
  },
  imgWrap: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    aspectRatio: '4/5',
    background: '#162540',
    boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top center',
    position: 'absolute',
    inset: 0,
  },
  cornerTR: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 60,
    height: 60,
    borderTop: '3px solid #0D7C5F',
    borderRight: '3px solid #0D7C5F',
    borderRadius: '0 12px 0 0',
    zIndex: 3,
  },
  cornerBL: {
    position: 'absolute',
    bottom: -8,
    left: -8,
    width: 60,
    height: 60,
    borderBottom: '3px solid #0D7C5F',
    borderLeft: '3px solid #0D7C5F',
    borderRadius: '0 0 0 12px',
    zIndex: 3,
  },
  dotsWrap: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 6,
    zIndex: 5,
  },
  badge: {
    position: 'absolute',
    bottom: -20,
    left: -30,
    background: 'rgba(10,17,30,0.95)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '18px 24px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    zIndex: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  badgeNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2rem',
    fontWeight: 600,
    color: '#0D7C5F',
    lineHeight: 1,
  },
  badgeLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(240,232,216,0.55)',
    marginTop: 4,
  },
  scrollInd: {
    position: 'absolute',
    bottom: 32,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    zIndex: 2,
  },
  scrollLine: {
    width: 1,
    height: 36,
    background: '#0D7C5F',
    transformOrigin: 'top',
  },
  scrollText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.55rem',
    fontWeight: 500,
    letterSpacing: '0.3em',
    color: 'rgba(240,232,216,0.4)',
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    background: 'rgba(255,255,255,0.06)',
  },
}
