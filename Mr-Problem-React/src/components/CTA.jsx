import { motion } from 'framer-motion'
import { ArrowRight, Star, Zap, Shield } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 45%, #A855F7 100%)' }}>

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)' }} />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

      <div className="section-wrap relative z-10 text-center">

        {/* Pills row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-center flex-wrap gap-3 mb-8"
        >
          {[
            { icon: Star,   text: '4.8 Rated' },
            { icon: Zap,    text: 'Same Day Available' },
            { icon: Shield, text: 'Fully Insured' },
          ].map(({ icon: Icon, text }) => (
            <span key={text}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white text-xs font-semibold backdrop-blur-sm">
              <Icon size={12} />
              {text}
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight tracking-tight mb-6"
        >
          Ready for a Cleaner,<br />
          <span style={{ color: '#DDD6FE' }}>Better Home?</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-white/65 text-lg max-w-xl mx-auto mb-10"
        >
          Join 1,200+ satisfied homeowners across Klang Valley. Book online in under 2 minutes — we'll handle the rest.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="https://mrproblemshop.com/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-purple-700 font-display font-bold text-base
                       transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-0.5">
            Book a Service Now
            <ArrowRight size={16} />
          </a>
          <a href="https://mrproblemshop.com/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/40 text-white font-semibold text-base
                       backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/70">
            View All Services
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-2"
        >
          <div className="flex -space-x-2">
            {['AM', 'SL', 'ZK', 'RJ', 'FH'].map((initials, i) => (
              <div key={i}
                className="w-9 h-9 rounded-full border-2 border-purple-500 flex items-center justify-center text-white text-[10px] font-bold font-display"
                style={{ background: `hsl(${260 + i * 20}, 70%, 55%)` }}>
                {initials}
              </div>
            ))}
          </div>
          <p className="text-white/60 text-sm ml-2">
            <span className="text-white font-semibold">1,200+ homeowners</span> trust Mr Problem
          </p>
        </motion.div>
      </div>
    </section>
  )
}
