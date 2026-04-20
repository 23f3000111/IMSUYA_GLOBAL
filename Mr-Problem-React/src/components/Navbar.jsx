import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Services',     href: '#services'      },
  { label: 'Why Us',       href: '#why-us'        },
  { label: 'How It Works', href: '#how-it-works'  },
  { label: 'Reviews',      href: '#testimonials'  },
  { label: 'FAQ',          href: '#faq'           },
]

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false)
  const [open, setOpen]                   = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => visible.set(e.target.id, e.isIntersecting))
        const active = ids.find(id => visible.get(id))
        if (active) setActiveSection(active)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    const t = setTimeout(() => {
      ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    }, 100)
    return () => { clearTimeout(t); observer.disconnect() }
  }, [])

  const isActive = (href) => activeSection === href.slice(1)

  return (
    <>
      <nav
        className={`fixed top-9 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md border-b border-gray-200'
            : 'bg-gray-950/85 backdrop-blur-lg border-b border-white/10'
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX, transformOrigin: '0% 50%' }}
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 to-fuchsia-400"
        />

        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center select-none group" aria-label="Mr Problem Home">
            <img
              src="/images/logo.avif"
              alt="Mr Problem"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href)
              return (
                <a key={label} href={href}
                  className={`relative text-sm font-medium transition-all duration-200 py-1 ${
                    active
                      ? (scrolled ? 'text-purple-600 font-semibold' : 'text-white font-semibold')
                      : (scrolled ? 'text-gray-500 hover:text-purple-600' : 'text-white/70 hover:text-white')
                  }`}>
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-bar"
                      className={`absolute -bottom-0.5 left-0 right-0 h-[2.5px] rounded-full ${
                        scrolled ? 'bg-purple-600' : 'bg-white'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://mrproblemshop.com/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>
              <Phone size={13} /> Book Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(o => !o)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 top-[104px] z-40 bg-white border-b border-gray-200 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col px-5 py-5 gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} onClick={() => setOpen(false)}
                  className={`py-3 px-4 rounded-xl font-medium transition-all text-sm border-l-[3px] ${
                    isActive(href)
                      ? 'bg-purple-50 text-purple-700 font-semibold border-purple-500'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-transparent'
                  }`}>
                  {label}
                </a>
              ))}
              <a href="https://mrproblemshop.com/" target="_blank" rel="noopener noreferrer"
                className="mt-3 py-3.5 px-4 rounded-2xl text-white font-semibold text-center text-sm hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
                Book a Service
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
