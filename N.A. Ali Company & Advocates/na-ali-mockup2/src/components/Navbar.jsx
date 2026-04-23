import React, { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        style={{
          ...s.nav,
          background: scrolled ? 'rgba(8,14,26,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={s.inner}>
          {/* Logo */}
          <a href="#" style={s.logo}>
            <img src="/N A ALI LOGO.png" alt="N.A. Ali Logo" style={s.logoImg} />
            <div style={s.logoText}>
              <span style={s.logoName}>N.A. ALI</span>
              <span style={s.logoSub}>& COMPANY ADVOCATES</span>
            </div>
          </a>

          {/* Desktop links */}
          <div style={s.links} className="nav-desk-links">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} style={s.link}
                onMouseEnter={e => e.currentTarget.style.color = '#0D7C5F'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,232,216,0.65)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div style={s.right}>
            <a href="#contact" style={s.cta} className="nav-cta-desk"
              onMouseEnter={e => { e.currentTarget.style.background = '#0a6a50'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0D7C5F'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </a>
            <button style={s.burger} className="nav-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen mobile menu */}
      {menuOpen && (
        <motion.div
          style={s.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button style={s.close} onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={28} />
          </button>
          <div style={s.menuLinks}>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                style={s.menuLink}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                onClick={() => setMenuOpen(false)}
              >
                <span style={s.menuIdx}>0{i + 1}</span>
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              style={{ ...s.menuLink, color: '#0D7C5F' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      )}

      <style>{`
        @media(max-width:900px){
          .nav-desk-links{ display:none!important }
          .nav-cta-desk{ display:none!important }
          .nav-burger{ display:block!important }
        }
      `}</style>
    </>
  )
}

const s = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'all 0.4s ease',
  },
  inner: {
    maxWidth: 1340,
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 3rem)',
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    textDecoration: 'none',
    color: '#F0E8D8',
  },
  logoImg: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoName: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#F0E8D8',
  },
  logoSub: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.52rem',
    fontWeight: 400,
    letterSpacing: '0.15em',
    color: 'rgba(240,232,216,0.45)',
    marginTop: 1,
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 36,
  },
  link: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 400,
    letterSpacing: '0.08em',
    color: 'rgba(240,232,216,0.65)',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#fff',
    background: '#0D7C5F',
    padding: '10px 22px',
    borderRadius: 6,
    textDecoration: 'none',
    transition: 'all 0.3s',
  },
  burger: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'rgba(240,232,216,0.8)',
    cursor: 'pointer',
    padding: 4,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    background: 'rgba(6,11,22,0.98)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    top: 24,
    right: 28,
    background: 'none',
    border: 'none',
    color: 'rgba(240,232,216,0.7)',
    cursor: 'pointer',
  },
  menuLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 28,
  },
  menuLink: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2.4rem',
    fontWeight: 300,
    color: 'rgba(240,232,216,0.85)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
  },
  menuIdx: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.7rem',
    color: '#9A9A9A',
    fontWeight: 400,
  },
}
