import { motion } from 'framer-motion'
import heroImg from '@img/BalerCutz_5.jpg'

const DELAY = 2.8 // after preloader exits

const wordVariant = {
  hidden: { y: '110%' },
  visible: (i) => ({
    y: 0,
    transition: { delay: DELAY + i * 0.14, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
}

const Hero = () => (
  <section id="hero" className="relative min-h-screen overflow-hidden bg-void">
    {/* Right image panel — desktop */}
    <div className="hidden lg:block absolute right-12 top-0 bottom-0 w-[49%] overflow-hidden">
      {/* Gradient bleed into left */}
      {/* <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-void via-void/7 to-transparent z-3" /> */}
      <img src={heroImg} alt="BalrCutz Barbershop" className="w-full h-full object-cover object-center" />
      {/* Dark tint */}
      <div className="absolute inset-0 bg-void/30" />
      {/* Gold corner decor */}
      <div className="absolute top-28 right-10 w-20 h-20 border-t-2 border-r-2 border-gold/30 z-20" />
      <div className="absolute bottom-20 left-20 w-20 h-20 border-b-2 border-l-2 border-gold/30 z-20" />
    </div>

    {/* Mobile bg */}
    <div className="lg:hidden absolute inset-0">
      <img src={heroImg} alt="" className="w-full h-full object-cover" />
      <div className="absolute" />
    </div>

    {/* Main content */}
    <div className="relative z-10 min-h-screen flex flex-col justify-center px-7 sm:px-12 lg:px-20 xl:px-28 pt-28 pb-16 max-w-[700px]">

      {/* Top label */}
      <motion.div
        className="flex items-center gap-3 mb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: DELAY, duration: 0.7 }}
      >
        <span className="w-8 h-px bg-gold" />
        <span className="section-label">Premium Barbershop · PJ & KL</span>
      </motion.div>

      {/* Staggered headline */}
      <div className="mb-8">
        {['WHERE', 'STYLE', 'MEETS', 'SPORT.'].map((word, i) => (
          <div key={word} className="overflow-hidden leading-none">
            <motion.span
              className={`font-display font-black block text-[clamp(3.2rem,10vw,8rem)] leading-[0.92] tracking-tight ${
                i === 1 ? 'italic text-gold' : 'text-white'
              } ${i === 3 ? 'font-light' : ''}`}
              variants={wordVariant}
              custom={i}
              initial="hidden"
              animate="visible"
            >
              {word}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Gold rule */}
      <motion.div
        className="gold-rule mb-7"
        style={{ width: 72 }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: DELAY + 0.6, duration: 0.8 }}
      />

      {/* Tagline */}
      <motion.p
        className="font-display italic text-lg text-white/45 mb-10 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: DELAY + 0.75 }}
      >
        Step In. Level Up. Stay Sharp.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex gap-4 flex-wrap mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: DELAY + 0.9, duration: 0.6 }}
      >
        <a
          href="https://balrcutz.setmore.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
        >
          Book Now
        </a>
        <button
          onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-outline-gold"
        >
          Our Services
        </button>
      </motion.div>

      {/* Rating badge */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: DELAY + 1.1 }}
      >
        <span className="text-gold text-sm tracking-widest">★★★★★</span>
        <span className="section-label text-white/30">4.95 Average · 976+ Reviews</span>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: DELAY + 1.4 }}
    >
      <span className="section-label text-white/20">Scroll</span>
      <motion.div
        className="w-px h-10 bg-gradient-to-b from-gold to-transparent"
        animate={{ opacity: [0.4, 1, 0.4], scaleY: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
      />
    </motion.div>
  </section>
)

export default Hero
