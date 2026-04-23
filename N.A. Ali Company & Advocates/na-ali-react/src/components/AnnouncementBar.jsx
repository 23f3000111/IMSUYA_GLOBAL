import React from 'react'
import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

const items = [
  'Trusted Legal Counsel',
  'Corporate & Family Law',
  'Based in Kenya',
  'Book a Consultation',
  'Strategic Legal Advice',
  'Proven Track Record',
  'Trusted Legal Counsel',
  'Corporate & Family Law',
  'Based in Kenya',
  'Book a Consultation',
  'Strategic Legal Advice',
  'Proven Track Record',
]

export default function AnnouncementBar() {
  return (
    <div
      style={{ background: 'linear-gradient(90deg, #0F172A 0%, #1e293b 50%, #0F172A 100%)' }}
      className="relative overflow-hidden py-2.5"
    >
      {/* Gold border bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
      
      <div className="overflow-hidden">
        <div className="marquee-track">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-3 px-6" style={{ color: '#E8D9A8', fontSize: '0.75rem', fontFamily: 'Manrope', fontWeight: 500, letterSpacing: '0.06em' }}>
              <Scale size={12} style={{ color: '#C9A227', flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
