import React from 'react'
import { motion } from 'framer-motion'
import { Star, Shield, Award, ArrowRight, ChevronRight } from 'lucide-react'

const floatCards = [
  { icon: <Shield size={16} />, text: 'Confidential Advice', delay: 0.8 },
  { icon: <Star size={16} />, text: 'Strategic Counsel', delay: 1 },
  { icon: <Award size={16} />, text: 'Trusted Representation', delay: 1.2 },
]

const WORD_VARIANTS = {
  hidden: { y: 80, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 55%, #0F172A 100%)',
        paddingTop: '160px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute', top: '20%', left: '-5%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-5%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      {/* Gold top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, #C9A227 40%, #E8D9A8 60%, transparent)',
      }} />

      <div className="section-wrap">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT TEXT */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8"
              style={{
                background: 'rgba(201,162,39,0.1)',
                border: '1px solid rgba(201,162,39,0.25)',
                borderRadius: '100px',
                padding: '6px 16px',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A227', display: 'inline-block' }} />
              <span style={{ color: '#E8D9A8', fontFamily: 'Manrope', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Trusted Legal Advisors in Kenya
              </span>
            </motion.div>

            {/* Headline */}
            <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
              <div className="flex flex-wrap gap-x-4">
                {['Legal', 'Clarity.'].map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={WORD_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    style={{
                      fontFamily: 'Playfair Display',
                      fontWeight: 800,
                      fontSize: 'clamp(5rem, 6vw, 5rem)',
                      lineHeight: 1.2,
                      color: word === 'Clarity.' ? '#C9A227' : '#F8FAFC',
                      display: 'block',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '32px' }}>
              <div className="flex flex-wrap gap-x-4">
                {['Strategic', 'Results.'].map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i + 2}
                    variants={WORD_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    style={{
                      fontFamily: 'Playfair Display',
                      fontWeight: 800,
                      fontSize: 'clamp(3rem, 6vw, 5rem)',
                      lineHeight: 1.05,
                      color: '#F8FAFC',
                      display: 'block',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ transformOrigin: 'left', marginBottom: '28px' }}
            >
              <div className="gold-line" />
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{
                color: 'rgba(248,250,252,0.65)',
                fontFamily: 'Manrope',
                fontWeight: 400,
                fontSize: '1.05rem',
                lineHeight: 1.8,
                maxWidth: '520px',
                marginBottom: '40px',
              }}
            >
              Professional legal representation in corporate, commercial, family law, succession, and advisory matters—tailored to protect your interests.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a href="#contact" className="btn-primary">
                Book Consultation <ArrowRight size={16} />
              </a>
              <a href="#practice" className="btn-outline">
                Explore Services <ChevronRight size={16} />
              </a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              {['Experienced Team', 'Client-Centered', 'Proven Track Record'].map((item, i) => (
                <React.Fragment key={item}>
                  <span style={{ color: 'rgba(232,217,168,0.7)', fontFamily: 'Manrope', fontSize: '0.8rem', fontWeight: 500 }}>
                    {item}
                  </span>
                  {i < 2 && (
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#C9A227', display: 'inline-block' }} />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Main image container */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,162,39,0.15)',
                position: 'relative',
              }}>
                <img
                  src="/N A ALI & COMPANY Advocates.jpg"
                  alt="N.A. Ali Company Advocates"
                  style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                  className="img-zoom"
                />
                {/* Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(15,23,42,0.6) 100%)',
                }} />
              </div>

              {/* Gold corner accent top-right */}
              <div style={{
                position: 'absolute', top: -16, right: -16, width: 80, height: 80,
                border: '2px solid rgba(201,162,39,0.5)',
                borderBottom: 'none', borderLeft: 'none',
                borderRadius: '0 12px 0 0',
              }} />
              {/* Gold corner accent bottom-left */}
              <div style={{
                position: 'absolute', bottom: -16, left: -16, width: 80, height: 80,
                border: '2px solid rgba(201,162,39,0.5)',
                borderTop: 'none', borderRight: 'none',
                borderRadius: '0 0 0 12px',
              }} />

              {/* Floating trust cards */}
              {floatCards.map((card, i) => (
                <motion.div
                  key={card.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.delay, duration: 0.5 }}
                  className="float-anim"
                  style={{
                    position: 'absolute',
                    left: i === 0 ? '-48px' : i === 1 ? '-56px' : 'auto',
                    right: i === 2 ? '-48px' : 'auto',
                    top: i === 0 ? '15%' : i === 1 ? '45%' : '25%',
                    background: 'rgba(15,23,42,0.92)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(201,162,39,0.25)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    animationDelay: `${i * 0.8}s`,
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: '8px',
                    background: 'rgba(201,162,39,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C9A227',
                  }}>
                    {card.icon}
                  </div>
                  <span style={{ color: '#F8FAFC', fontFamily: 'Manrope', fontSize: '0.78rem', fontWeight: 600 }}>
                    {card.text}
                  </span>
                </motion.div>
              ))}

              {/* Floating firm photo — bottom-left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="img-zoom-wrap"
                style={{
                  position: 'absolute',
                  bottom: '-24px',
                  left: '-40px',
                  width: '148px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
                  border: '2px solid rgba(201,162,39,0.35)',
                  zIndex: 3,
                }}
              >
                <img
                  src="/N A ALI.png"
                  alt="N.A. Ali Advocates"
                  className="img-zoom"
                  style={{ width: '100%', height: '110px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  background: 'linear-gradient(135deg, #0F172A 0%, #1a1608 100%)',
                  padding: '8px 12px',
                  borderTop: '1px solid rgba(201,162,39,0.2)',
                }}>
                  <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.65rem', color: '#C9A227', letterSpacing: '0.08em', textTransform: 'uppercase' }}>N.A. Ali & Co.</div>
                  <div style={{ fontFamily: 'Manrope', fontSize: '0.58rem', color: 'rgba(255,255,255,0.45)', marginTop: '1px' }}>Advocates</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom wave / scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Manrope', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, #C9A227, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
