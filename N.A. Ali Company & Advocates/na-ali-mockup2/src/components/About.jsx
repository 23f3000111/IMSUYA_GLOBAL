import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '20+', label: 'Years of Practice' },
  { value: '2,500+', label: 'Cases Resolved' },
  { value: '98%', label: 'Success Rate' },
  { value: '15+', label: 'Legal Disciplines' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" style={s.section}>
      <div style={s.container} ref={ref}>
        <motion.div style={s.left}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={s.imgWrap}>
            <img src="/NATASHA.A.ALI_3.jpg" alt="Natasha A. Ali — Managing Partner" style={s.img} />
          </div>
          <div style={s.statsRow}>
            {stats.map((stat, i) => (
              <motion.div key={i} style={s.stat}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              >
                <span style={s.statVal}>{stat.value}</span>
                <span style={s.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div style={s.right}
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label">About the Firm</span>
          <h2 style={s.heading}>A Legacy of Legal <br /><span style={s.italic}>Excellence</span></h2>
          <p style={s.body}>N.A. Ali & Company Advocates is a distinguished full-service law firm with a proven track record spanning over two decades. Founded by Advocate Natasha A. Ali, the firm has established itself as a trusted name in Pakistani jurisprudence.</p>
          <p style={s.body}>Our commitment to meticulous legal research, ethical advocacy, and client-first service has earned us the confidence of individuals, multinational corporations, and government bodies alike.</p>
          <div style={s.featureGrid}>
            {[['Client-Centered', 'Every strategy is tailored to your unique circumstances and goals.'],
              ['Integrity-Driven', 'We uphold the highest ethical standards in every case we take.'],
              ['Comprehensive Reach', 'Full-service capabilities across 15+ areas of legal practice.'],
              ['Proven Track Record', 'Thousands of successful outcomes across diverse matters.']
            ].map(([title, desc], i) => (
              <motion.div key={i} style={s.feature}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(13,124,95,0.2)'; e.currentTarget.style.background = 'rgba(13,124,95,0.03)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.background = '#fff' }}
              >
                <div style={s.featureDot} />
                <div>
                  <h4 style={s.featureTitle}>{title}</h4>
                  <p style={s.featureDesc}>{desc}</p>
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
  section: { padding: '120px 0', background: '#F3EDE3' },
  container: { maxWidth: 1340, margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 3rem)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' },
  left: { display: 'flex', flexDirection: 'column', gap: 40 },
  imgWrap: { position: 'relative', overflow: 'hidden', borderRadius: 12, aspectRatio: '4/5', maxHeight: 500, boxShadow: '0 20px 50px rgba(0,0,0,0.08)' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  imgCorner: { position: 'absolute', bottom: 0, right: 0, width: 80, height: 80, borderTop: '3px solid #0D7C5F', borderLeft: '3px solid #0D7C5F' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 },
  stat: { display: 'flex', flexDirection: 'column', gap: 4, padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.08)' },
  statVal: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: '#0D7C5F', lineHeight: 1 },
  statLabel: { fontFamily: "'Outfit', sans-serif", fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', color: '#9A9A9A', textTransform: 'uppercase' },
  right: { display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 20 },
  heading: { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1.1, color: '#1A1A1A', marginTop: 8 },
  italic: { fontStyle: 'italic', color: '#0D7C5F' },
  body: { fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: '#6B6B6B' },
  featureGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 },
  feature: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: 20, background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 8, transition: 'all 0.3s' },
  featureDot: { width: 6, height: 6, borderRadius: '50%', background: '#0D7C5F', marginTop: 6, flexShrink: 0 },
  featureTitle: { fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#1A1A1A', marginBottom: 4 },
  featureDesc: { fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', fontWeight: 300, lineHeight: 1.5, color: '#9A9A9A' },
}
