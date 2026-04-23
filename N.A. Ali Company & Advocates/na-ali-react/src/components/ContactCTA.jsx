import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone, Mail } from 'lucide-react'

export default function ContactCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      style={{ background: '#F8FAFC', padding: '96px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(201,162,39,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
      }} />

      <div className="section-wrap" ref={ref}>
        {/* Main CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
            borderRadius: '24px',
            padding: 'clamp(48px, 7vw, 80px)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(201,162,39,0.15)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.2)',
          }}
        >
          {/* Gold accent top */}
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
            background: 'linear-gradient(90deg, transparent, #C9A227, transparent)',
          }} />

          {/* Decorative radial */}
          <div style={{
            position: 'absolute', top: '-30%', right: '-10%', width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                className="section-label mb-4"
              >
                Get in Touch
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                style={{
                  fontFamily: 'Playfair Display', fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                  color: '#F8FAFC', lineHeight: 1.15, marginBottom: '20px',
                }}
              >
                Need Trusted Legal <span style={{ color: '#C9A227' }}>Guidance?</span>
              </motion.h2>
              <div className="gold-line" style={{ marginBottom: '24px' }} />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                style={{
                  color: 'rgba(248,250,252,0.6)', fontFamily: 'Manrope',
                  fontSize: '1rem', lineHeight: 1.8, marginBottom: '40px',
                }}
              >
                Speak with N.A. Ali Company & Advocates for clear legal advice and strong representation. We're ready to protect what matters most to you.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a href="mailto:info@naali.co.ke" className="btn-primary">
                  Book Consultation <ArrowRight size={16} />
                </a>
                <a href="tel:+254700000000" className="btn-outline">
                  <Phone size={16} /> Call Us
                </a>
              </motion.div>
            </div>

            {/* Right contact card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.7 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(201,162,39,0.12)',
                borderRadius: '16px',
                padding: '36px',
              }}
            >
              <h3 style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1.25rem', color: '#F8FAFC', marginBottom: '24px' }}>
                Contact Information
              </h3>

              {[
                { icon: <Phone size={18} />, label: 'Phone', value: '+254 700 000 000' },
                { icon: <Mail size={18} />, label: 'Email', value: 'info@naali.co.ke' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '16px',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: '8px',
                    background: 'rgba(201,162,39,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C9A227', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ color: '#C9A227', fontFamily: 'Manrope', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>
                      {item.label}
                    </div>
                    <div style={{ color: '#E8D9A8', fontFamily: 'Manrope', fontSize: '0.95rem', fontWeight: 500 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}

              {/* Office Location */}
              <div style={{
                marginTop: '28px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ color: '#C9A227', fontFamily: 'Manrope', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Office Location
                </div>
                <div style={{ color: 'rgba(248,250,252,0.55)', fontFamily: 'Manrope', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  Mombasa, Kenya<br />
                  Available Mon–Fri, 8:00am – 6:00pm
                </div>
              </div>

              {/* Logo watermark */}
              <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <img src="/N A ALI LOGO.png" alt="N.A. Ali" style={{ height: '36px', opacity: 0.6, filter: 'brightness(1.2)' }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
