import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

// Deterministic background particles
const ctaParticles = Array.from({ length: 16 }, (_, i) => ({
  x: ((i * 23.1 + 7) % 94) + 3,
  y: ((i * 17.3 + 11) % 88) + 6,
  size: i % 3 === 0 ? 3 : 2,
  delay: (i * 0.4) % 3,
  dur: 3 + (i * 0.3) % 2,
}));

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="relative overflow-hidden bg-cta-gradient py-24" ref={ref}>
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ctaParticles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [-15, 15], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/40 to-transparent" />

      <div className="container-xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse" />
            24/7 Dispatch Available
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Need Reliable{' '}
            <span className="text-brand-yellow">Logistics</span>{' '}
            Support?
          </h2>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Speak with our team for transport and cargo solutions tailored to your business needs
            across East Africa.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href={SITE}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-brand-yellow text-brand-deep font-bold px-8 py-4 rounded-xl shine-btn hover:bg-yellow-300 transition-all duration-300 shadow-glow-yellow text-base"
            >
              Get a Quote <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="tel:+254000000000"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/70 transition-all duration-300 text-base"
            >
              <Phone size={18} /> Call Now
            </motion.a>
          </div>

          {/* Trust note */}
          <p className="mt-8 text-white/40 text-sm">
            Trusted by importers, manufacturers, energy companies and port operators across East Africa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
