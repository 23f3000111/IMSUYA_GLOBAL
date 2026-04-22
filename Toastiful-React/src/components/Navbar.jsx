import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = ['Home', 'Menu', 'Story', 'Location', 'Reviews'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-based active section tracker
  useEffect(() => {
    const sectionIds = ['home', 'story', 'menu', 'location', 'reviews'];
    const track = () => {
      const scrollPos = window.scrollY + 120;
      let current = 'home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', track, { passive: true });
    track();
    return () => window.removeEventListener('scroll', track);
  }, []);

  const handleNav = (section) => {
    setOpen(false);
    const id = section.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-9 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={() => handleNav('home')} className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-[#5BC8C1] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 8C4 6.89 4.89 6 6 6h12a2 2 0 012 2v2H4V8z" fill="white"/>
              <path d="M4 10h16l-1.5 8H5.5L4 10z" fill="white" fillOpacity="0.7"/>
            </svg>
          </span>
          <span className="font-playfair font-bold text-xl tracking-tight text-[#111827]">
            Toastiful
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className={`font-manrope text-sm font-medium transition-colors duration-200 relative group ${
                  isActive ? 'text-[#5BC8C1]' : 'text-[#374151] hover:text-[#5BC8C1]'
                }`}
              >
                {link}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#5BC8C1] rounded-full transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <button
            onClick={() => handleNav('location')}
            className="btn-teal text-sm"
          >
            Visit Us
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#111827] p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
          >
            <div className="px-5 py-6 flex flex-col gap-5">
              {links.map((link) => {
                const isActive = activeSection === link.toLowerCase();
                return (
                  <button
                    key={link}
                    onClick={() => handleNav(link)}
                    className={`font-manrope text-base font-medium text-left transition-colors ${
                      isActive ? 'text-[#5BC8C1]' : 'text-[#111827] hover:text-[#5BC8C1]'
                    }`}
                  >
                    {link}
                  </button>
                );
              })}
              <button
                onClick={() => handleNav('location')}
                className="btn-teal text-sm w-full text-center mt-2"
              >
                Visit Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
