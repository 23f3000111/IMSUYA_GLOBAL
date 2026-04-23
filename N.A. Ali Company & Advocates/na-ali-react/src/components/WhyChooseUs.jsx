import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle, Users, Globe, Zap, BookOpen, TrendingUp } from 'lucide-react'

const reasons = [
  {
    icon: <CheckCircle size={24} />,
    title: 'Commitment to Integrity & Professionalism',
    desc: 'Every engagement is founded on transparent, ethical legal practice. We hold ourselves to the highest standards of professional conduct.',
    img: '/Commitment to Integrity and Professionalism.png',
  },
  {
    icon: <Users size={24} />,
    title: 'Client-Centered Approach',
    desc: "Your goals are our priority. We listen carefully and tailor our legal strategy to your specific needs, not a one-size-fits-all solution.",
    img: '/Client-Centered Approach.png',
  },
  {
    icon: <Globe size={24} />,
    title: 'Comprehensive Support',
    desc: 'From initial consultation through to resolution, we provide end-to-end support across every stage of your legal journey.',
    img: '/Comprehensive Support and Resources.png',
  },
  {
    icon: <Zap size={24} />,
    title: 'Efficient & Cost-Effective Solutions',
    desc: 'We value your time and resources. Our lean, focused approach delivers prompt, practical results without unnecessary delays.',
    img: '/Efficient and Cost-Effective Solutions.png',
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Expertise Across Multiple Legal Fields',
    desc: 'With deep knowledge spanning corporate, commercial, family, and advisory law, we offer a truly comprehensive legal service.',
    img: '/Expertise Across Multiple Legal Fields.png',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Track Record of Success',
    desc: 'Our results speak for themselves. Consistent outcomes for clients across industries and legal complexities are our benchmark.',
    img: '/Track Record of Success.png',
  },
]

function Card({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="card-lift"
      style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(15,23,42,0.06)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Content */}
      <div style={{ padding: '32px 28px', flex: 1 }}>
        {/* Icon area */}
        <div style={{
          width: 48, height: 48, borderRadius: '10px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#C9A227', marginBottom: '16px',
        }}>
          {item.icon}
        </div>
        <h3 style={{
          fontFamily: 'Playfair Display',
          fontWeight: 700,
          fontSize: '1.05rem',
          color: '#111827',
          lineHeight: 1.3,
          marginBottom: '12px',
        }}>
          {item.title}
        </h3>

        {/* Gold line */}
        <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #C9A227, transparent)', marginBottom: '14px' }} />

        <p style={{
          color: '#6B7280',
          fontFamily: 'Manrope',
          fontSize: '0.9rem',
          lineHeight: 1.75,
        }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why" style={{ background: '#F8FAFC', padding: '96px 0' }}>
      <div className="section-wrap">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label mb-4"
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#0F172A',
              marginBottom: '16px',
            }}
          >
            Why Clients Trust N.A. Ali
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ transformOrigin: 'center' }}
            className="mb-6"
          >
            <div className="gold-line-center" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              color: '#6B7280',
              fontFamily: 'Manrope',
              fontSize: '1rem',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Delivering principled, client-focused legal services with integrity and measurable results.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {reasons.map((item, i) => (
            <Card key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
