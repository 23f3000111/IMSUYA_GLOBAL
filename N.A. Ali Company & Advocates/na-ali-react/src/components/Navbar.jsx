import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Practice Areas', href: '#practice' },
  { label: 'Why Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 z-50 navbar-blur transition-all duration-500"
        style={{
          top: scrolled ? '0' : '34px',
          background: scrolled
            ? 'rgba(15,23,42,0.98)'
            : 'rgba(15,23,42,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(201,162,39,0.2)' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        <div className="section-wrap h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img
              src="/N A ALI LOGO.png"
              alt="N.A. Ali & Company Advocates"
              className="h-12 w-auto object-contain"
              style={{ filter: 'brightness(1.1)' }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative group"
                style={{
                  color: 'rgba(248,250,252,0.85)',
                  fontFamily: 'Manrope',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#C9A227')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(248,250,252,0.85)')}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-yellow-500 to-transparent transition-all duration-300 w-0 group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, #C9A227, transparent)' }}
                />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+254700000000"
              className="flex items-center gap-2"
              style={{
                color: 'rgba(232,217,168,0.8)',
                fontFamily: 'Manrope',
                fontSize: '0.8rem',
                textDecoration: 'none',
              }}
            >
              <Phone size={14} />
            </a>
            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.8rem' }}
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded"
            style={{ color: '#E8D9A8', background: 'rgba(255,255,255,0.05)' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed z-40 left-0 right-0 lg:hidden"
            style={{
              top: '118px',
              background: 'rgba(15,23,42,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(201,162,39,0.2)',
              padding: '24px 24px 32px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMobileOpen(false)}
                className="block py-3 border-b"
                style={{
                  color: 'rgba(248,250,252,0.85)',
                  fontFamily: 'Manrope',
                  fontWeight: 500,
                  fontSize: '1rem',
                  borderColor: 'rgba(255,255,255,0.07)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              className="btn-primary mt-6 w-full justify-center"
              style={{ display: 'flex' }}
              onClick={() => setMobileOpen(false)}
            >
              Book Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
