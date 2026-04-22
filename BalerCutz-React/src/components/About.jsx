import { motion } from 'framer-motion'
import { slideLeft, slideRight, fadeUp, stagger } from '../animations'
import aboutImg from '@img/BalerCutz_4.jpg'

const stats = [
  { num: '976+', label: 'Reviews' },
  { num: '4.95★', label: 'Avg Rating' },
  { num: '2', label: 'Locations' },
]

const About = () => (
  <section id="about" className="bg-void py-28 lg:py-36 overflow-hidden">
    <div className="max-w-[1200px] mx-auto px-7">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left — Text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section number */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <span className="section-label">01</span>
            <span className="w-6 h-px bg-gold/40" />
            <span className="section-label">About Us</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display font-bold text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] text-white mb-6"
          >
            More Than<br />
            <span className="italic text-gold">A Barbershop</span>
          </motion.h2>

          <motion.div variants={fadeUp} custom={2} className="gold-rule mb-8" style={{ width: 56 }} />

          <motion.p variants={fadeUp} custom={3} className="text-white/50 text-[0.95rem] mb-5 leading-relaxed">
            BalrCutz is where style meets sport. Inspired by the energy of the locker room and the precision of the greatest athletes, we deliver top-tier grooming in a space designed for winners.
          </motion.p>
          <motion.p variants={fadeUp} custom={4} className="text-white/50 text-[0.95rem] mb-12 leading-relaxed">
            From <span className="text-gold font-semibold">sharp precision fades</span> to premium scalp treatments, every service is executed with the same focus and discipline that defines a champion. Walk in looking good — walk out looking unbeatable.
          </motion.p>

          {/* Stats */}
          <motion.div variants={stagger} className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="bg-card border border-white/[0.07] p-5 text-center"
              >
                <div className="font-display text-2xl text-gold tracking-wide">{s.num}</div>
                <div className="section-label text-white/30 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Image */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Decorative gold frame offset */}
          <div className="absolute -top-4 -right-4 w-full h-full border border-gold/20 pointer-events-none" />
          <div className="overflow-hidden">
            <img
              src={aboutImg}
              alt="BalrCutz barber at work"
              className="w-full h-[520px] object-cover object-top"
              loading="lazy"
            />
          </div>
          {/* Gold tag */}
          <div className="absolute bottom-6 left-6 bg-gold px-5 py-2">
            <span className="font-display tracking-[0.2em] text-sm text-void font-bold">SINCE 2024</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)

export default About
