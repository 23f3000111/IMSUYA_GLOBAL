import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../animations'
import { ArrowUpRight } from 'lucide-react'

const areas = [
  {
    num: '01',
    title: 'Company Law',
    desc: 'Expert guidance on company formation, corporate governance, compliance, and board advisory for businesses of all sizes.',
    featured: false,
    img: '/COMPANY LAW.png',
    href: 'https://naaliadvocates.com/web/company-law-2/',
  },
  {
    num: '02',
    title: 'Commercial Law',
    desc: 'Comprehensive commercial legal services covering trade agreements, business transactions, and regulatory compliance.',
    featured: true,
    badge: '★ Core Practice',
    img: '/COMMERCIAL LAW.jpg',
    href: 'https://naaliadvocates.com/web/commercial-law/',
  },
  {
    num: '03',
    title: 'Family Law & Succession',
    desc: 'Sensitive, professional support in family disputes, divorce, custody, inheritance, and succession planning matters.',
    featured: false,
    img: '/FAMILY LAW AND SUCCESSION.png',
    href: 'https://naaliadvocates.com/web/family-law-and-succession/',
  },
  {
    num: '04',
    title: 'Legal Advisory',
    desc: 'Strategic legal counsel to help individuals and organizations make informed, confident decisions on complex matters.',
    featured: false,
    img: '/Legal Expertise.png',
    href: 'https://naaliadvocates.com/web/',
  },
  {
    num: '05',
    title: 'Contracts & Compliance',
    desc: 'Drafting, reviewing, and negotiating contracts to safeguard your interests while ensuring full legal compliance.',
    featured: false,
    img: '/Commitment to Integrity and Professionalism.png',
    href: 'https://naaliadvocates.com/web/',
  },
  {
    num: '06',
    title: 'Dispute Resolution',
    desc: 'Skilled mediation, arbitration, and litigation to resolve disputes efficiently, protecting your position and rights.',
    featured: false,
    img: '/N A ALI & COMPANY Advocates.png',
    href: 'https://naaliadvocates.com/web/',
  },
]

const AreaCard = ({ area, i }) => (
  <motion.a
    href={area.href}
    target="_blank"
    rel="noopener noreferrer"
    variants={fadeUp}
    custom={i}
    className={`group relative flex flex-col transition-all duration-500 ${
      area.featured
        ? 'border-[rgba(201,162,39,0.5)]'
        : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(201,162,39,0.3)]'
    }`}
    style={{
      border: area.featured ? '1px solid rgba(201,162,39,0.5)' : '1px solid rgba(255,255,255,0.07)',
      background: area.featured
        ? 'linear-gradient(135deg, #0F172A 0%, #1a1608 100%)'
        : 'rgba(15,23,42,0.7)',
      padding: '2rem',
      textDecoration: 'none',
      cursor: 'pointer',
      minHeight: '220px',
    }}
    whileHover={!area.featured ? { borderColor: 'rgba(201,162,39,0.35)', y: -4 } : { y: -4 }}
    transition={{ duration: 0.25 }}
  >
    {/* Left accent bar */}
    <div
      className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#C9A227] transition-all duration-500 ${
        area.featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}
    />

    {/* Top-right arrow icon */}
    <div
      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ color: '#C9A227' }}
    >
      <ArrowUpRight size={16} />
    </div>

    {/* Image header */}
    {area.img && (
      <div style={{
        height: '150px',
        margin: '-2rem -2rem 1.5rem -2rem',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
      }}>
        <img
          src={area.img}
          alt={area.title}
          className="img-zoom"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 55%, rgba(15,23,42,0.55) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Number overlay on image */}
        <div style={{
          position: 'absolute', bottom: 10, right: 14,
          fontFamily: 'Playfair Display', fontWeight: 800,
          fontSize: '2.5rem', lineHeight: 1,
          color: 'rgba(255, 255, 255, 0.97)',
          letterSpacing: '-0.02em',
        }}>
          {area.num}
        </div>
        {area.badge && (
          <span
            style={{
              position: 'absolute', top: 12, left: 14,
              background: '#C9A227', color: '#0F172A',
              fontFamily: 'Manrope', fontWeight: 700,
              fontSize: '0.58rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', padding: '4px 10px', borderRadius: '2px',
            }}
          >
            {area.badge}
          </span>
        )}
      </div>
    )}

    {!area.img && area.badge && (
      <span
        className="self-start text-[0.6rem] font-bold tracking-[0.3em] uppercase mb-3"
        style={{ background: '#C9A227', color: '#0F172A', fontFamily: 'Manrope', padding: '4px 10px', borderRadius: '2px' }}
      >
        {area.badge}
      </span>
    )}

    {!area.img && (
      <span
        className="section-label mb-2"
        style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'Manrope' }}
      >
        {area.num}
      </span>
    )}

    <div
      style={{
        width: 32, height: 1,
        background: area.featured ? 'rgba(201,162,39,0.5)' : 'rgba(255,255,255,0.1)',
        marginBottom: '14px',
      }}
    />

    <h3
      style={{
        fontFamily: 'Playfair Display',
        fontWeight: 700,
        fontSize: '1.3rem',
        lineHeight: 1.25,
        color: area.featured ? '#C9A227' : '#F8FAFC',
        marginBottom: '12px',
      }}
    >
      {area.title}
    </h3>
    <p
      style={{
        color: 'rgba(248,250,252,0.5)',
        fontFamily: 'Manrope',
        fontSize: '0.875rem',
        lineHeight: 1.75,
        flex: 1,
      }}
    >
      {area.desc}
    </p>

    <div
      className="flex items-center gap-1.5 mt-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
      style={{ color: '#C9A227', fontFamily: 'Manrope', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.04em' }}
    >
      Learn More
      <ArrowUpRight size={13} />
    </div>
  </motion.a>
)

export default function PracticeAreas() {
  return (
    <section id="practice" style={{ background: '#0F172A', padding: '112px 0 128px' }}>
      <div className="section-wrap">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <span className="section-label">03</span>
              <span style={{ width: 24, height: 1, background: 'rgba(201,162,39,0.4)', display: 'inline-block' }} />
              <span className="section-label">Legal Expertise</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              style={{
                fontFamily: 'Playfair Display',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                lineHeight: 1.1,
                color: '#F8FAFC',
              }}
            >
              Our <em style={{ color: '#C9A227', fontStyle: 'italic' }}>Practice</em> Areas
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            custom={2}
            href="#contact"
            className="btn-primary self-start sm:self-auto whitespace-nowrap"
            style={{ textDecoration: 'none' }}
          >
            Book Consultation
          </motion.a>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {areas.map((area, i) => (
            <AreaCard key={area.num} area={area} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
