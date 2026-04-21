import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronRight } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';
const SECTION_IDS = ['home','services','fleet','network','why-us','contact'];

const navLinks = [
  { label: 'Home',     href: '#home'     },
  { label: 'Services', href: '#services' },
  { label: 'Fleet',    href: '#fleet'    },
  { label: 'Network',  href: '#network'  },
  { label: 'About',    href: '#why-us'   },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar() {
  const [scrolled,    setScrolled]   = useState(false);
  const [mobileOpen,  setMobileOpen] = useState(false);
  const [activeId,    setActiveId]   = useState('home');

  /* scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* scroll-spy via IntersectionObserver */
  useEffect(() => {
    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* close on resize */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  /* Navbar sits below the 40px bar when visible.
     When user scrolls, the bar slides up and navbar moves to top-0. */
  const navTop = scrolled ? 'top-0' : 'top-[40px]';

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${navTop} ${
          scrolled
            ? 'bg-white/96 backdrop-blur-xl shadow-md border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <a href={SITE} target="_blank" rel="noopener noreferrer"
               className="flex items-center group flex-shrink-0">
              <img
                src="/images/Roadtainers_logo.jpg"
                alt="Roadtainers"
                className="h-12 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = `#${activeId}` === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`relative px-4 py-2 text-[0.84rem] font-semibold rounded-lg transition-all duration-200 group ${
                      active
                        ? scrolled ? 'text-brand-green' : 'text-white'
                        : scrolled ? 'text-gray-600 hover:text-brand-green' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-brand-yellow transition-all duration-300 origin-left ${
                      active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70'
                    }`} />
                  </a>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex">
              <motion.a
                href={SITE} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 bg-brand-yellow text-brand-deep font-bold px-5 py-2.5 rounded-xl text-sm shine-btn hover:bg-yellow-300 hover:shadow-glow-yellow transition-all duration-300"
              >
                Request Quote <ArrowRight size={14} />
              </motion.a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors duration-200 ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={mobileOpen ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mob"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[116px] z-30 bg-white rounded-2xl shadow-2xl border border-gray-100 lg:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-3 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 ${
                    `#${activeId}` === link.href
                      ? 'bg-green-50 text-brand-green'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-brand-green'
                  }`}
                >
                  {link.label}
                  <ChevronRight size={15} className="opacity-40" />
                </motion.a>
              ))}
              <div className="p-2 pt-2 mt-1 border-t border-gray-100">
                <a href={SITE} target="_blank" rel="noopener noreferrer"
                   onClick={() => setMobileOpen(false)}
                   className="flex items-center justify-center gap-2 w-full bg-brand-yellow text-brand-deep font-bold py-3 rounded-xl text-sm shine-btn">
                  Request a Quote <ArrowRight size={15} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
