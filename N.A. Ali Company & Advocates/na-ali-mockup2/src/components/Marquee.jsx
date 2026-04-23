import React from 'react'
import { motion } from 'framer-motion'

const items = [
  'Corporate Law',
  'Civil Litigation',
  'Criminal Defense',
  'Family Law',
  'Banking & Finance',
  'Intellectual Property',
  'Real Estate',
  'Tax Advisory',
  'Constitutional Law',
  'Arbitration',
]

export default function Marquee() {
  const row = items.map((t, i) => (
    <span key={i} style={s.item}>
      <span style={s.dot} />
      <span style={s.text}>{t}</span>
    </span>
  ))

  return (
    <div style={s.wrap}>
      <div style={s.track}>
        {row}{row}
      </div>
    </div>
  )
}

const s = {
  wrap: {
    overflow: 'hidden',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(16,185,129,0.02)',
    padding: '18px 0',
  },
  track: {
    display: 'flex',
    whiteSpace: 'nowrap',
    animation: 'marquee-scroll 30s linear infinite',
    width: 'max-content',
  },
  item: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    marginRight: 48,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#10B981',
    flexShrink: 0,
  },
  text: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 400,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgb(0, 0, 0)',
  },
}

// Inject marquee keyframe
const css = document.createElement('style')
css.textContent = `@keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`
document.head.appendChild(css)
