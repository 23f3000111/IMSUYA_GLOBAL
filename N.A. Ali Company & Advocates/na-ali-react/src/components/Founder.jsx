import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Award, Users, Lightbulb, Star, ChevronRight, ChevronLeft } from 'lucide-react'

const achievements = [
  { icon: <Award size={18} />, label: '10+ Years Experience' },
  { icon: <Users size={18} />, label: 'Client-First Philosophy' },
  { icon: <Lightbulb size={18} />, label: 'Strategic Legal Thinking' },
  { icon: <Star size={18} />, label: 'Professional Excellence' },
]

const founderImages = [
  '/NATASHA.A.ALI.jpg',
  '/NATASHA.A.ALI_1.jpg',
  '/NATASHA.A.ALI_2.jpg',
  '/NATASHA.A.ALI_3.jpg',
]

export default function Founder() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [imgIdx, setImgIdx] = useState(0)

  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      setImgIdx(prev => (prev + 1) % founderImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="about"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative radial */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(201,162,39,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-wrap">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left - Image carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Background card */}
            <div style={{
              position: 'absolute',
              bottom: -24, left: -24,
              width: '100%', height: '100%',
              border: '2px solid rgba(201,162,39,0.2)',
              borderRadius: '16px',
            }} />

            {/* Main image with crossfade */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              position: 'relative',
              zIndex: 1,
              height: '520px',
            }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={founderImages[imgIdx]}
                  alt="Natasha A. Ali — Lead Advocate"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                    background: '#1e293b',
                    position: 'absolute',
                    inset: 0,
                  }}
                />
              </AnimatePresence>

              {/* Image navigation dots */}
              <div style={{
                position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: '8px', zIndex: 5,
              }}>
                {founderImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    style={{
                      width: imgIdx === i ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: imgIdx === i ? '#C9A227' : 'rgba(255,255,255,0.35)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrow buttons */}
              <button
                onClick={() => setImgIdx(prev => (prev - 1 + founderImages.length) % founderImages.length)}
                style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 5, transition: 'all 0.2s',
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setImgIdx(prev => (prev + 1) % founderImages.length)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 5, transition: 'all 0.2s',
                }}
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>

              {/* Bottom overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 50%)',
                padding: '28px 24px 24px',
                zIndex: 3,
              }}>
                <div style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1.3rem', color: '#F8FAFC' }}>
                  Natasha A. Ali
                </div>
                <div style={{ color: '#C9A227', fontFamily: 'Manrope', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>
                  Founder & Lead Advocate
                </div>
              </div>
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: 32, right: -28,
                background: 'linear-gradient(135deg, #C9A227 0%, #b8911e 100%)',
                borderRadius: '12px',
                padding: '16px 20px',
                textAlign: 'center',
                boxShadow: '0 12px 40px rgba(201,162,39,0.4)',
                zIndex: 2,
              }}
            >
              <div style={{ fontFamily: 'Playfair Display', fontWeight: 800, fontSize: '2rem', color: '#0F172A', lineHeight: 1 }}>10+</div>
              <div style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '0.7rem', color: '#0F172A', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>Years</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label mb-4">Meet Our Founder</p>
            <h2 style={{
              fontFamily: 'Playfair Display',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              color: '#F8FAFC',
              marginBottom: '20px',
              lineHeight: 1.15,
            }}>
              Meet <span style={{ color: '#C9A227' }}>Natasha A. Ali</span>
            </h2>
            <div className="gold-line" style={{ marginBottom: '28px' }} />

            <p style={{
              color: 'rgba(248,250,252,0.65)',
              fontFamily: 'Manrope',
              fontSize: '1rem',
              lineHeight: 1.85,
              marginBottom: '20px',
            }}>
              Natasha A. Ali is the founding advocate and driving force behind N.A. Ali Company & Advocates. With over a decade of dedicated practice, she brings clarity, precision, and commitment to every client engagement.
            </p>
            <p style={{
              color: 'rgba(248,250,252,0.65)',
              fontFamily: 'Manrope',
              fontSize: '1rem',
              lineHeight: 1.85,
              marginBottom: '40px',
            }}>
              Her approach blends strategic legal thinking with genuine empathy—ensuring clients are not just represented, but truly understood and supported throughout their legal journey.
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {achievements.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ color: '#C9A227', flexShrink: 0 }}>{item.icon}</div>
                  <span style={{ color: '#E8D9A8', fontFamily: 'Manrope', fontWeight: 500, fontSize: '0.85rem' }}>
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <a href="#contact" className="btn-primary" style={{ display: 'inline-flex' }}>
              Book a Consultation <ChevronRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
