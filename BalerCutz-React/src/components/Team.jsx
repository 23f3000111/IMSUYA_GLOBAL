import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn } from '../animations'
import micheal from '@img/Micheal Barber.png'
import laith from '@img/Laith Mahfoud.webp'
import img1 from '@img/BalerCutz_1.jpg'
import img2 from '@img/BalerCutz_2.jpg'

const barbers = [
  { name: 'MICHEAL', role: 'Master Barber', exp: '13 Years', specialty: 'Classic Cuts · Beard Design', img: micheal },
  { name: 'LAITH', role: 'Zero Fade Specialist', exp: '6 Years', specialty: 'Zero Fades · Modern Styles', img: laith },
  { name: 'ISSA', role: 'Colour & Fade Expert', exp: '12 Years', specialty: 'Skin Fades · Hair Colour', img: img2 },
  { name: 'AMMAR', role: 'Precision Stylist', exp: 'Expert', specialty: 'Precision Cuts · Styling', img: img1 },
]

const Team = () => (
  <section id="team" className="bg-void py-28 lg:py-36 overflow-hidden">
    <div className="max-w-[1200px] mx-auto px-7">

      {/* Header */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-4">
          <span className="section-label">03</span>
          <span className="w-6 h-px bg-gold/40" />
          <span className="section-label">The Crew</span>
        </motion.div>
        <motion.h2 variants={fadeUp} custom={1} className="font-display font-bold text-[clamp(2.4rem,5vw,3.8rem)] text-white">
          Meet the <span className="italic text-gold">Barbers</span>
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="font-display italic text-white/35 mt-3 text-lg">
          Hand-picked professionals who treat every cut like game day.
        </motion.p>
      </motion.div>

      {/* Team grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {barbers.map((b, i) => (
          <motion.div
            key={b.name}
            variants={scaleIn}
            custom={i}
            className="team-card relative overflow-hidden group bg-card"
          >
            <div className="overflow-hidden aspect-[3/4]">
              <img
                src={b.img}
                alt={b.name}
                className="team-img w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            {/* Info overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="section-label text-gold mb-1">{b.role}</div>
              <div className="font-display text-xl text-white tracking-wide">{b.name}</div>
              <div className="text-white/40 text-xs mt-1">{b.specialty}</div>
              <div className="section-label text-white/30 mt-2">{b.exp}</div>
            </div>
            {/* Always-visible name at bottom */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
              <div className="font-display text-lg text-white tracking-widest">{b.name}</div>
              <div className="section-label text-gold/70 mt-0.5">{b.role}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Booking nudge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a href="https://balrcutz.setmore.com/" target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
          Book Your Barber
        </a>
      </motion.div>
    </div>
  </section>
)

export default Team
