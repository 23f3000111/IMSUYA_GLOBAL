import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn } from '../animations'

const locations = [
  {
    name: 'JAYA ONE',
    address: 'D-55-P2, Block D, Jaya One,\nJln Prof. Diraja Ungku Aziz,\n46200 Petaling Jaya, Selangor',
    rating: '4.96',
    reviews: '761',
    bookUrl: 'https://balrcutz.setmore.com/',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.0!2d101.6363!3d3.1189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4b83e5e81c7d%3A0xb6d00b3b3e0dae89!2sBalrCutz+Barbershop!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy',
    tag: 'Primary Location',
  },
  {
    name: 'SRI HARTAMAS',
    address: 'No.1, 2nd Floor, Jalan 26A/70A,\nSri Hartamas,\n50480 Kuala Lumpur',
    rating: '4.93',
    reviews: '215',
    bookUrl: 'https://balrcutzhartamas.setmore.com/',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.0!2d101.6650!3d3.1700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4bb3ec97e4d3%3A0xc13fc7b8e6a2a6a0!2sBalrCutz+Hartamas!5e0!3m2!1sen!2smy!4v1700000000001!5m2!1sen!2smy',
    tag: 'KL Branch',
  },
]

const Locations = () => (
  <section id="locations" className="bg-void py-28 lg:py-36">
    <div className="max-w-[1200px] mx-auto px-7">

      {/* Header */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-16"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
          <span className="section-label">05</span>
          <span className="w-6 h-px bg-gold/40" />
          <span className="section-label">Find Us</span>
        </motion.div>
        <motion.h2 variants={fadeUp} custom={1} className="font-display font-bold text-[clamp(2.4rem,5vw,3.8rem)] text-white">
          Our <span className="italic text-gold">Locations</span>
        </motion.h2>
        <motion.div variants={fadeUp} custom={2} className="mt-3 flex items-center gap-4">
          <span className="w-12 h-px bg-gold" />
          <span className="text-white/35 text-sm">Wed–Mon: 10AM – 9PM · Tuesday: Closed</span>
        </motion.div>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {locations.map((loc, i) => (
          <motion.div
            key={loc.name}
            variants={scaleIn}
            custom={i}
            className="bg-card border border-white/[0.07] overflow-hidden group hover:border-gold/30 duration-400"
          >
            {/* Map */}
            <div className="relative overflow-hidden h-[240px]">
              <iframe
                title={`Map of ${loc.name}`}
                src={loc.mapSrc}
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay to block iframe pointer capture on mobile */}
              <div className="absolute inset-0 pointer-events-none" />
            </div>

            {/* Info */}
            <div className="p-7">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="section-label text-gold block mb-1">{loc.tag}</span>
                  <h3 className="font-display text-2xl text-white tracking-wide">{loc.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-gold font-display text-xl">{loc.rating}★</div>
                  <div className="section-label text-white/25">{loc.reviews} reviews</div>
                </div>
              </div>

              <p className="text-white/40 text-sm leading-relaxed mb-4 whitespace-pre-line">{loc.address}</p>

              <div className="flex items-center gap-2 text-white/30 text-sm mb-6">
                <span className="text-gold text-xs">◆</span>
                <span>Wed–Mon 10AM–9PM · Tue Closed</span>
              </div>

              <div className="flex gap-3">
                <a
                  href={loc.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-xs px-6 py-3"
                >
                  Book Here
                </a>
                <a
                  href={`tel:+60126061715`}
                  className="btn-outline-gold text-xs px-6 py-3"
                >
                  Call Us
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    
    </div>
  </section>
)

export default Locations
