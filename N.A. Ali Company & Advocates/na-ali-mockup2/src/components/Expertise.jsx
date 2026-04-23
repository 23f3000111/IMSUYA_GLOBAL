import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const areas = [
  {
    num: '01',
    title: 'Corporate & Company Law',
    desc: 'Formation, governance, M&A advisory, shareholder disputes, and regulatory compliance for businesses of every scale.',
    image: '/COMPANY LAW.png',
  },
  {
    num: '02',
    title: 'Commercial & Banking Law',
    desc: 'Complex commercial disputes, banking regulations, trade finance, securities law, and financial restructuring.',
    image: '/COMMERCIAL LAW.jpg',
  },
  {
    num: '03',
    title: 'Family Law & Succession',
    desc: 'Divorce, custody, maintenance, inheritance, succession certificates, and guardianship matters handled with sensitivity.',
    image: '/FAMILY LAW AND SUCCESSION.png',
  },
  {
    num: '04',
    title: 'Civil & Criminal Litigation',
    desc: 'Strategic representation in trial and appellate courts across civil disputes, criminal defense, and constitutional petitions.',
    image: '/Legal Expertise.png',
  },
]

export default function Expertise() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="expertise" style={s.section}>
      <div style={s.container} ref={ref}>
        {/* Header */}
        <motion.div
          style={s.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="label">Areas of Practice</span>
          <h2 style={s.heading}>
            Legal Expertise <span style={s.italic}>Refined</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={s.grid}>
          {areas.map((area, i) => (
            <motion.div
              key={i}
              style={s.card}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'
                e.currentTarget.style.background = 'rgba(16,185,129,0.03)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
              }}
            >
              {/* Image */}
              <div style={s.cardImgWrap}>
                <img src={area.image} alt={area.title} style={s.cardImg} />
                <div style={s.cardImgOverlay} />
              </div>

              {/* Content */}
              <div style={s.cardContent}>
                <span style={s.cardNum}>{area.num}</span>
                <h3 style={s.cardTitle}>{area.title}</h3>
                <p style={s.cardDesc}>{area.desc}</p>
                <div style={s.cardLink}>
                  <span style={s.cardLinkText}>Learn More</span>
                  <ArrowUpRight size={14} style={{ color: '#10B981' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const s = {
  section: {
    padding: '120px 0',
    background: '#101B2E',
    position: 'relative',
  },
  container: {
    maxWidth: 1340,
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 3rem)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 64,
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    fontWeight: 300,
    color: '#FAFAFA',
    lineHeight: 1.1,
  },
  italic: {
    fontStyle: 'italic',
    color: '#10B981',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,
  },
  card: {
    background: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(255,255,255,0.06)',
    overflow: 'hidden',
    transition: 'all 0.4s ease',
    cursor: 'pointer',
  },
  cardImgWrap: {
    position: 'relative',
    height: 220,
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(10%) brightness(0.9)',
    transition: 'all 0.6s ease',
  },
  cardImgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)',
  },
  cardContent: {
    padding: '28px 32px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  cardNum: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    color: '#10B981',
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.6rem',
    fontWeight: 400,
    color: '#FAFAFA',
    lineHeight: 1.2,
  },
  cardDesc: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 300,
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.45)',
  },
  cardLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  cardLinkText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#10B981',
  },
}
