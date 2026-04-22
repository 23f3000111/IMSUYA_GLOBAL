import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../animations'

const CTA = () => (
  <section id="cta" className="relative bg-void py-28 lg:py-40 overflow-hidden">
    {/* Radial gold glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gold/5 blur-[80px]" />
    </div>
    {/* Thin lines */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

    {/* Corner decor */}
    <div className="absolute top-10 left-10 w-14 h-14 border-t border-l border-gold/20" />
    <div className="absolute top-10 right-10 w-14 h-14 border-t border-r border-gold/20" />
    <div className="absolute bottom-10 left-10 w-14 h-14 border-b border-l border-gold/20" />
    <div className="absolute bottom-10 right-10 w-14 h-14 border-b border-r border-gold/20" />

    <div className="relative z-10 max-w-[900px] mx-auto px-7 text-center">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-8">
          <span className="w-8 h-px bg-gold" />
          <span className="section-label">Ready to Level Up?</span>
          <span className="w-8 h-px bg-gold" />
        </motion.div>

        <motion.div variants={fadeUp} custom={1} className="overflow-hidden mb-2">
          <span className="font-display font-black text-[clamp(3rem,9vw,8rem)] leading-none text-white block">
            BOOK YOUR
          </span>
        </motion.div>
        <motion.div variants={fadeUp} custom={2} className="overflow-hidden mb-10">
          <span className="font-display font-black italic text-[clamp(3rem,9vw,8rem)] leading-none text-gold block">
            APPOINTMENT
          </span>
        </motion.div>

        <motion.p variants={fadeUp} custom={3} className="font-display italic text-white/35 text-xl mb-12">
          Two locations. One standard: excellence.
        </motion.p>

        <motion.div variants={fadeUp} custom={4} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://balrcutz.setmore.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Book — Jaya One
          </a>
          <a
            href="https://balrcutzhartamas.setmore.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold"
          >
            Book — Sri Hartamas
          </a>
        </motion.div>

        <motion.p variants={fadeUp} custom={5} className="mt-8 section-label text-white/20">
          Or call us: +60 12-606 1715
        </motion.p>
      </motion.div>
    </div>
  </section>
)

export default CTA
