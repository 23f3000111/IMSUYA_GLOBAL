import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" style={s.section}>
      <div style={s.container} ref={ref}>
        <motion.div
          style={s.inner}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Left — big CTA */}
          <div style={s.left}>
            <span className="label">Get in Touch</span>
            <h2 style={s.heading}>
              Ready to Discuss <br />
              Your <span style={s.italic}>Case?</span>
            </h2>
            <p style={s.body}>
              Schedule a confidential consultation with our legal team. We'll evaluate your situation and outline a clear path forward — no obligation.
            </p>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" style={s.btn}>
              <span>Book a Consultation</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Right — contact details */}
          <div style={s.right}>
            {[
              { icon: <Phone size={18} />, label: 'Phone', value: '+92 300 123 4567', href: 'tel:+923001234567' },
              { icon: <Mail size={18} />, label: 'Email', value: 'info@naalilaw.com', href: 'mailto:info@naalilaw.com' },
              { icon: <MapPin size={18} />, label: 'Office', value: 'Islamabad, Pakistan' },
              { icon: <Clock size={18} />, label: 'Hours', value: 'Mon — Fri  9:00 AM — 6:00 PM' },
            ].map((item, i) => (
              <motion.div
                key={i}
                style={s.contactItem}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              >
                <div style={s.iconWrap}>{item.icon}</div>
                <div>
                  <span style={s.contactLabel}>{item.label}</span>
                  {item.href ? (
                    <a href={item.href} style={s.contactValue}>{item.value}</a>
                  ) : (
                    <span style={s.contactValue}>{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
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
  },
  container: {
    maxWidth: 1340,
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 3rem)',
  },
  inner: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: 80,
    alignItems: 'start',
    padding: '72px 64px',
    background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.01) 100%)',
    border: '1px solid rgba(16,185,129,0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    fontWeight: 300,
    color: '#FAFAFA',
    lineHeight: 1.1,
  },
  italic: { fontStyle: 'italic', color: '#10B981' },
  body: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.5)',
    maxWidth: 440,
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#0a0a0a',
    background: '#10B981',
    padding: '16px 36px',
    textDecoration: 'none',
    marginTop: 8,
    transition: 'all 0.35s',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    paddingBottom: 24,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  iconWrap: {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(16,185,129,0.2)',
    color: '#10B981',
    flexShrink: 0,
  },
  contactLabel: {
    display: 'block',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.35)',
    marginBottom: 4,
  },
  contactValue: {
    display: 'block',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 400,
    color: '#FAFAFA',
    textDecoration: 'none',
  },
}
