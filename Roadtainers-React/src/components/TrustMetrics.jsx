import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCounter } from '../hooks/useCounter';

function Stat({ end, suffix, label, sublabel }) {
  const { count, ref } = useCounter(end, 2200);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl sm:text-6xl font-extrabold text-white mb-2 tabular-nums">
        {count}
        <span className="text-brand-yellow">{suffix}</span>
      </div>
      <div className="text-white font-semibold text-base mb-0.5">{label}</div>
      {sublabel && <div className="text-white/40 text-sm">{sublabel}</div>}
    </div>
  );
}

export default function TrustMetrics() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  const stats = [
    { end: 140, suffix: '+', label: 'Fleet Assets', sublabel: 'Active vehicles & equipment' },
    { end: 25, suffix: '+', label: 'Years Experience', sublabel: 'Since 1998' },
    { end: 10, suffix: 'k+', label: 'Trips Completed', sublabel: 'Across East Africa' },
    { end: 98, suffix: '%', label: 'On-Time Delivery', sublabel: 'Consistent reliability' },
  ];

  return (
    <section className="bg-brand-deep relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Glow accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-xl py-16 relative z-10" ref={sectionRef}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 divide-y-2 lg:divide-y-0 lg:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={i > 1 ? 'pt-8 lg:pt-0' : ''}
            >
              <Stat {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
