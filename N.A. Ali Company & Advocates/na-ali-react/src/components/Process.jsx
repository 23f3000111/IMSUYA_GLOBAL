import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquare, Search, Lightbulb, Scale, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <MessageSquare size={24} />,
    title: 'Consultation',
    desc: 'We begin with a focused consultation to understand your situation, goals, and legal needs clearly.',
  },
  {
    number: '02',
    icon: <Search size={24} />,
    title: 'Case Review',
    desc: 'Our team conducts a thorough analysis of all documents, facts, and applicable legal frameworks.',
  },
  {
    number: '03',
    icon: <Lightbulb size={24} />,
    title: 'Legal Strategy',
    desc: 'We craft a transparent, tailored legal strategy designed to achieve the best possible outcome.',
  },
  {
    number: '04',
    icon: <Scale size={24} />,
    title: 'Representation',
    desc: 'Skilled, confident representation—whether in negotiations, arbitration, or formal court proceedings.',
  },
  {
    number: '05',
    icon: <CheckCircle2 size={24} />,
    title: 'Resolution',
    desc: 'We pursue a clear, effective resolution and ensure you fully understand every outcome achieved.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: '#F8FAFC', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle gold accent */}
      <div style={{
        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
        width: '4px', height: '60%',
        background: 'linear-gradient(to bottom, transparent, #C9A227, transparent)',
      }} />

      <div className="section-wrap" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-label mb-4"
          >
            Our Process
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
            The Client Approach
          </motion.h2>
          <div className="mb-6">
            <div className="gold-line-center" />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              color: '#6B7280', fontFamily: 'Manrope', fontSize: '1rem',
              maxWidth: '520px', margin: '0 auto', lineHeight: 1.8,
            }}
          >
            A clear, structured approach that keeps you informed and confident at every stage.
          </motion.p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:flex items-start gap-0 relative">
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: '32px',
            left: 'calc(10% + 32px)',
            right: 'calc(10% + 32px)',
            height: '1px',
            background: 'linear-gradient(90deg, #C9A227, rgba(201,162,39,0.2) 70%, transparent)',
          }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              style={{ flex: 1, textAlign: 'center', padding: '0 12px', position: 'relative' }}
            >
              {/* Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: 64, height: 64,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C9A227 0%, #b8911e 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 24px rgba(201,162,39,0.35)',
                  color: '#0F172A',
                  position: 'relative', zIndex: 1,
                }}
              >
                {step.icon}
              </motion.div>

              {/* Step number */}
              <div style={{
                fontFamily: 'Manrope', fontWeight: 800, fontSize: '0.7rem',
                color: '#C9A227', letterSpacing: '0.12em', marginBottom: '8px',
              }}>
                STEP {step.number}
              </div>

              <h3 style={{
                fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1.1rem',
                color: '#0F172A', marginBottom: '10px',
              }}>
                {step.title}
              </h3>
              <p style={{
                color: '#6B7280', fontFamily: 'Manrope', fontSize: '0.85rem', lineHeight: 1.7,
              }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ display: 'flex', gap: '20px', paddingBottom: i < 4 ? '32px' : 0 }}
            >
              {/* Left column: circle + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C9A227, #b8911e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0F172A', flexShrink: 0,
                }}>
                  {step.icon}
                </div>
                {i < 4 && (
                  <div style={{ width: 1, flex: 1, minHeight: '40px', background: 'rgba(201,162,39,0.3)', marginTop: '8px' }} />
                )}
              </div>

              {/* Right: content */}
              <div style={{ paddingTop: '8px' }}>
                <div style={{ color: '#C9A227', fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  STEP {step.number}
                </div>
                <h3 style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1.1rem', color: '#0F172A', marginBottom: '6px' }}>
                  {step.title}
                </h3>
                <p style={{ color: '#6B7280', fontFamily: 'Manrope', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
