import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn } from '../animations'
import img3 from '@img/BalerCutz_3.jpg'
import img4 from '@img/BalerCutz_4.jpg'
import img5 from '@img/BalerCutz_5.jpg'
import img7 from '@img/BalerCutz_7.jpg'

const photos = [
  { src: img7, alt: 'Premium barbershop atmosphere', span: 'lg:row-span-2' },
  { src: img3, alt: 'Precision fade haircut', span: '' },
  { src: img5, alt: 'BalrCutz barbershop interior', span: '' },
  { src: img4, alt: 'Expert barber at work', span: '' },
]

const Gallery = () => (
  <section id="gallery" className="bg-void-2 py-28 lg:py-36 overflow-hidden">
    <div className="max-w-[1200px] mx-auto px-7">

      {/* Header */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
      >
        <div>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
            <span className="section-label">06</span>
            <span className="w-6 h-px bg-gold/40" />
            <span className="section-label">Gallery</span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-display font-bold text-[clamp(2.4rem,5vw,3.8rem)] text-white">
            The <span className="italic text-gold">Craft</span>
          </motion.h2>
        </div>
        <motion.a
          variants={fadeUp}
          custom={2}
          href="https://www.instagram.com/balrcutz/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-gold self-start sm:self-auto"
        >
          Follow @balrcutz
        </motion.a>
      </motion.div>

      {/* Asymmetric grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[280px]"
      >
        {photos.map((p, i) => (
          <motion.div
            key={i}
            variants={scaleIn}
            custom={i}
            className={`gal-item relative overflow-hidden ${p.span}`}
          >
            <img
              src={p.src}
              alt={p.alt}
              className="gal-img w-full h-full object-cover"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-all duration-500 flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="w-10 h-10 border border-gold rounded-full flex items-center justify-center">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="1.5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </div>
            {/* Always-visible gold corner */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/30 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)

export default Gallery
