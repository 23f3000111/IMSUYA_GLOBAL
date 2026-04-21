import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const LINKS = [
  { label: 'Services',  href: '#services'  },
  { label: 'Network',   href: '#network'   },
  { label: 'Fleet',     href: '#story'     },
  { label: 'Awards',    href: '#awards'    },
  { label: 'Contact',   href: '#cta'       },
];
const SITE = 'https://www.roadtainers.co.ke/';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-[0_2px_40px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="wrap-xl flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <div className={`rounded-xl overflow-hidden px-2 py-1 transition-colors duration-300 ${scrolled ? 'bg-transparent' : 'bg-white/90'}`}>
              <img
                src="/images/Roadtainers_logo.jpg"
                alt="Roadtainers"
                className="h-8 w-auto object-contain block"
              />
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) => {
              const id = l.href.replace('#', '');
              const isActive = active === id;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  className={`text-sm font-semibold transition-colors duration-200 relative group ${
                    scrolled
                      ? isActive ? 'text-v2-green' : 'text-v2-text hover:text-v2-green'
                      : isActive ? 'text-v2-yellow' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {l.label}
                  <span className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  } ${scrolled ? 'bg-v2-green' : 'bg-v2-yellow'}`} />
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={SITE}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-yellow text-sm shadow-none transition-all duration-300`}
            >
              Get Quote <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              scrolled ? 'text-v2-text hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 bg-v2-dark/98 backdrop-blur-xl border-b border-white/10 lg:hidden"
          >
            <div className="wrap py-6 flex flex-col gap-1">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 text-white/80 font-semibold text-base rounded-xl hover:bg-white/8 hover:text-white transition-all"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={SITE}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 btn-yellow justify-center"
              >
                Get Quote <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
