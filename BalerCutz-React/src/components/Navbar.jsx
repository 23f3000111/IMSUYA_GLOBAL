import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '@img/BalerCutz_logo.jpg'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Barbers', href: '#team' },
  { label: 'Locations', href: '#locations' },
  { label: 'Gallery', href: '#gallery' },
]

const scrollTo = (href, closeFn) => {
  if (closeFn) closeFn()
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-[76px] transition-all duration-500 ${
          scrolled ? 'bg-void/90 backdrop-blur-xl border-b border-white/[0.06]' : ''
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-7 h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}>
            <img src={logo} alt="BalrCutz" className="h-11 object-contain" />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="section-label text-white hover:text-white transition-colors duration-300 leading-none"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5">
            <a
              href="https://balrcutz.setmore.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block btn-outline-gold"
            >
              Book Now
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden flex flex-col gap-[6px] justify-center w-7 h-7"
              aria-label="Toggle menu"
            >
              <span className={`block h-px w-full bg-white transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[9px]' : ''}`} />
              <span className={`block h-px w-full bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-full bg-white transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[99] bg-void flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-gold/25" />
            <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-gold/25" />

            <nav className="flex flex-col items-center gap-2">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  onClick={() => scrollTo(l.href, close)}
                  className="font-display font-bold text-5xl sm:text-6xl text-white/30 hover:text-gold transition-colors duration-300 py-2"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              className="absolute bottom-14 flex gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a href="https://www.instagram.com/balrcutz/" target="_blank" rel="noopener noreferrer" className="section-label text-white/25 hover:text-gold transition-colors">Instagram</a>
              <a href="https://balrcutz.setmore.com/" target="_blank" rel="noopener noreferrer" className="section-label text-white/25 hover:text-gold transition-colors">Book Now</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
