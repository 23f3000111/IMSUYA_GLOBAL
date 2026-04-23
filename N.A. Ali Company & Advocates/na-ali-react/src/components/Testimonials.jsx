import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'James Kariuki',
    role: 'Business Owner',
    text: 'N.A. Ali Company & Advocates provided exceptional legal guidance for our corporate restructuring. Professional, responsive, and genuinely invested in our success.',
    rating: 5,
  },
  {
    name: 'Amina Hassan',
    role: 'Private Client',
    text: 'Clear, compassionate guidance throughout a very challenging family matter. Natasha ensured I understood every step of the process and felt fully supported.',
    rating: 5,
  },
  {
    name: 'Peter Wambua',
    role: 'Managing Director',
    text: 'Highly recommended for any business legal matters. Their advice on our commercial contracts was thorough, practical, and delivered on time.',
    rating: 5,
  },
  {
    name: 'Sarah Omondi',
    role: 'Entrepreneur',
    text: 'Trustworthy, efficient, and results-oriented. The team showed genuine care for our situation and consistently delivered outstanding representation.',
    rating: 5,
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)',
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
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'Playfair Display', fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F8FAFC', marginBottom: '16px',
            }}
          >
            What Our Clients Say
          </motion.h2>
          <div><div className="gold-line-center" /></div>
        </div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(201,162,39,0.15)',
            borderRadius: '20px',
            padding: 'clamp(32px, 5vw, 64px)',
            position: 'relative',
          }}
        >
          {/* Large quote mark */}
          <div style={{
            position: 'absolute', top: '24px', left: '28px',
            color: 'rgba(201,162,39,0.12)',
            fontSize: '120px',
            fontFamily: 'Playfair Display',
            lineHeight: 1,
            pointerEvents: 'none',
          }}>
            "
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} fill="#C9A227" color="#C9A227" />
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: 'Playfair Display', fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                color: '#F8FAFC', lineHeight: 1.75,
                marginBottom: '36px',
                position: 'relative', zIndex: 1,
              }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C9A227, #b8911e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1.2rem',
                  color: '#0F172A',
                }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontFamily: 'Manrope', fontWeight: 700, color: '#F8FAFC', fontSize: '1rem' }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: 'Manrope', color: '#C9A227', fontSize: '0.8rem', fontWeight: 500 }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`testimonial-dot ${i === current ? 'active' : ''}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 44, height: 44, borderRadius: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#E8D9A8', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 44, height: 44, borderRadius: '10px',
                  background: 'linear-gradient(135deg, #C9A227, #b8911e)',
                  border: 'none',
                  color: '#0F172A', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
