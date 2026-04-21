import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Truck, Droplets, Package, ArrowUpDown, Layers, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

const fleet = [
  {
    name: 'Low Loaders',
    icon: Truck,
    count: '15+',
    capacity: 'Up to 120 Tonnes',
    desc: 'Specialized for abnormal and heavy cargo. Fully permitted for cross-border transport.',
    accent: '#FACC15',
    bg: '#fffbeb',
    image: '/images/Transport.jpg',
  },
  {
    name: 'Tankers',
    icon: Droplets,
    count: '25+',
    capacity: '30,000L Average',
    desc: 'ISO-certified tankers for fuel, water, chemicals and bulk liquid cargo.',
    accent: '#60A5FA',
    bg: '#eff6ff',
    image: '/images/Safe & Smooth Movement.jpg',
  },
  {
    name: 'Flatbeds',
    icon: Layers,
    count: '30+',
    capacity: 'Up to 60 Tonnes',
    desc: 'Open deck trailers for machinery, steel, lumber and project cargo.',
    accent: '#34D399',
    bg: '#ecfdf5',
    image: '/images/Roadtainers_hero.jpg',
  },
  {
    name: 'Cranes',
    icon: ArrowUpDown,
    count: '8+',
    capacity: 'Up to 200 Tonnes',
    desc: 'Mobile and crawler cranes for heavy lifting, installation and plant work.',
    accent: '#F87171',
    bg: '#fef2f2',
    image: '/images/Lifting Facilities.jpg',
  },
  {
    name: 'Tractor Heads',
    icon: Truck,
    count: '35+',
    capacity: 'Multi-Axle Config',
    desc: 'Prime movers matched to every trailer type in our fleet.',
    accent: '#A78BFA',
    bg: '#f5f3ff',
    image: '/images/Tractor Trailers.jpg',
  },
  {
    name: 'Cargo Trucks',
    icon: Package,
    count: '27+',
    capacity: 'Up to 30 Tonnes',
    desc: 'General and consolidated cargo delivery across urban and inter-city routes.',
    accent: '#FB923C',
    bg: '#fff7ed',
    image: '/images/General Cargo.jpg',
  },
];

export default function Fleet() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = fleet.length;

  const goTo = useCallback((idx) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 3200);
    return () => clearInterval(timer);
  }, [paused, next]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  // Get visible indices: prev, center, next
  const indices = [-1, 0, 1].map(offset => ((current + offset) % total + total) % total);

  return (
    <section id="fleet" className="section-pad bg-white overflow-hidden">
      <div className="container-xl mb-12" ref={headerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="badge bg-green-100 text-brand-green mb-4">
            <Zap size={12} fill="currentColor" />
            Our Fleet
          </span>
          <h2 className="heading-lg text-brand-dark mb-5">
            Built for Scale.{' '}
            <span className="text-gradient-green">Built for Africa.</span>
          </h2>
          <p className="text-brand-gray text-lg leading-relaxed">
            140+ assets across six categories — ready to handle your heaviest, most critical cargo.
          </p>
        </motion.div>
      </div>

      {/* ── Carousel ── */}
      <div
        className="relative select-none group/carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="container-xl">
          <div className="relative flex items-center justify-center gap-6 min-h-[420px]">

            {/* LEFT ARROW */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-0 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-brand-green hover:border-brand-green transition-all duration-200 group opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft size={22} className="text-gray-500 group-hover:text-white transition-colors" />
            </button>

            {/* CARDS */}
            <div className="flex gap-5 items-center justify-center w-full overflow-hidden px-16">
              <AnimatePresence mode="popLayout">
              {indices.map((idx, pos) => {
                const item = fleet[idx];
                const isCenter = pos === 1;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.18 } }}
                    animate={{
                      scale: isCenter ? 1 : 0.88,
                      opacity: isCenter ? 1 : 0.5,
                      y: isCenter ? -8 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    className={`relative rounded-3xl overflow-hidden border flex-shrink-0 cursor-pointer
                      ${isCenter
                        ? 'w-80 shadow-2xl border-brand-green/25 z-10'
                        : 'w-64 shadow-md border-gray-100 hidden md:block'
                      }`}
                    onClick={() => !isCenter && goTo(idx)}
                    style={{ background: item.bg }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${isCenter ? 'scale-105' : 'scale-100'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Count badge */}
                      <div className="absolute top-4 right-4 rounded-2xl px-3 py-2 text-center shadow-lg"
                        style={{ backgroundColor: item.accent }}>
                        <div className="text-xl font-extrabold text-white leading-none">{item.count}</div>
                        <div className="text-[9px] text-white/80 font-semibold uppercase tracking-wide">units</div>
                      </div>

                      {/* Icon */}
                      <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                        style={{ backgroundColor: `${item.accent}40`, border: `1.5px solid ${item.accent}60` }}>
                        <item.icon size={20} style={{ color: item.accent }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="h-1 rounded-full mb-3" style={{ background: `linear-gradient(90deg, ${item.accent}, ${item.accent}50)` }} />
                      <h3 className="font-extrabold text-brand-dark text-lg mb-1">{item.name}</h3>
                      <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                        style={{ backgroundColor: `${item.accent}20`, color: item.accent }}>
                        {item.capacity}
                      </span>
                      <p className="text-brand-gray text-sm leading-relaxed">{item.desc}</p>
                      {isCenter && (
                        <a href={SITE} target="_blank" rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold"
                          style={{ color: item.accent }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Request This Fleet <ChevronRight size={14} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              </AnimatePresence>
            </div>

            {/* RIGHT ARROW */}
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-0 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-brand-green hover:border-brand-green transition-all duration-200 group opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight size={22} className="text-gray-500 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {fleet.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? 28 : 8,
                  height: 8,
                  backgroundColor: i === current ? '#0F7B46' : '#d1d5db',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container-xl mt-12 text-center">
        <a href={SITE} target="_blank" rel="noopener noreferrer" className="btn-outline-green inline-flex">
          Request Fleet Availability <Truck size={16} />
        </a>
      </div>
    </section>
  );
}