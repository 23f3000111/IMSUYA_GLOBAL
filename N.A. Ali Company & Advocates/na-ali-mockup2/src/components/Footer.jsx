import React from 'react'
import { Scale, ArrowUp } from 'lucide-react'

const links = [
  {
    title: 'Navigation',
    items: [
      { label: 'About', href: '#about' },
      { label: 'Expertise', href: '#expertise' },
      { label: 'Process', href: '#process' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Practice Areas',
    items: [
      { label: 'Corporate Law' },
      { label: 'Commercial Law' },
      { label: 'Family Law' },
      { label: 'Criminal Defense' },
      { label: 'Civil Litigation' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.container}>
        {/* Top */}
        <div style={s.top}>
          <div style={s.brand}>
            <div style={s.logoRow}>
              <img src="/N A ALI LOGO.png" alt="N.A. Ali Logo" style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }} />
              <div>
                <span style={s.logoName}>N.A. ALI & COMPANY</span>
                <span style={s.logoSub}>ADVOCATES & LEGAL CONSULTANTS</span>
              </div>
            </div>
            <p style={s.brandDesc}>
              Delivering precise, principled legal solutions since 2005. Your trust is the foundation of everything we do.
            </p>
          </div>

          {links.map((group, i) => (
            <div key={i} style={s.linkGroup}>
              <h4 style={s.groupTitle}>{group.title}</h4>
              {group.items.map((item, j) => (
                <a key={j} href={item.href || '#'} style={s.link}>{item.label}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={s.divider} />

        {/* Bottom */}
        <div style={s.bottom}>
          <span style={s.copy}>© {new Date().getFullYear()} N.A. Ali & Company Advocates. All rights reserved.</span>
          <button
            style={s.backTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

const s = {
  footer: {
    background: '#070D1A',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '72px 0 36px',
  },
  container: {
    maxWidth: 1340,
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 3rem)',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: 60,
    marginBottom: 48,
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  logoBox: {
    width: 36,
    height: 36,
    border: '1.5px solid #10B981',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoN: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1rem',
    fontWeight: 300,
    color: '#10B981',
  },
  logoName: {
    display: 'block',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: '#FAFAFA',
  },
  logoSub: {
    display: 'block',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.5rem',
    fontWeight: 400,
    letterSpacing: '0.12em',
    color: 'rgba(255,255,255,0.35)',
    marginTop: 1,
  },
  brandDesc: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 300,
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.4)',
    maxWidth: 340,
  },
  linkGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  groupTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 4,
  },
  link: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  divider: {
    width: '100%',
    height: 1,
    background: 'rgba(255,255,255,0.06)',
    marginBottom: 24,
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copy: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.25)',
  },
  backTop: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'none',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.5)',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
}
