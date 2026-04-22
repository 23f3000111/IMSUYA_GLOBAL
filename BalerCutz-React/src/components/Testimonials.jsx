import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger } from '../animations'

const reviews = [
  {
    text: 'Absolutely amazing experience. Came in as a first timer and was blown away by the attention to detail on my fade. Already booked my next appointment!',
    author: 'Loghan K.',
    branch: 'Jaya One',
    stars: 5,
  },
  {
    text: 'Issa is a true professional. Explained every step and gave me the cleanest skin fade I\'ve ever had. The vibe in this place is unmatched.',
    author: 'Karim D.',
    branch: 'Jaya One',
    stars: 5,
  },
  {
    text: 'Super amazing! The shop is clean and modern, the barbers are skilled and friendly. Will definitely be back every month.',
    author: 'Mohamad N.',
    branch: 'Sri Hartamas',
    stars: 5,
  },
  {
    text: 'Great environment. Walked out with a completely new style and so much confidence. The team really knows what they\'re doing.',
    author: 'Muwin A.',
    branch: 'Jaya One',
    stars: 5,
  },
  {
    text: 'Fantastic barbers, friendly staff, and the results speak for themselves. The MVP package is 100% worth it. Highly recommend!',
    author: 'Azhar H.',
    branch: 'Sri Hartamas',
    stars: 5,
  },
]

const Testimonials = () => {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % reviews.length), 6000)
    return () => clearInterval(t)
  }, [])

  const r = reviews[idx]

  return (
    <section id="testimonials" className="bg-void-2 py-28 lg:py-36 overflow-hidden">
      <div className="max-w-[900px] mx-auto px-7">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-4">
            <span className="section-label">04</span>
            <span className="w-6 h-px bg-gold/40" />
            <span className="section-label">What Clients Say</span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-display font-bold text-[clamp(2.4rem,5vw,3.8rem)] text-white">
            Real <span className="italic text-gold">Reviews</span>
          </motion.h2>
        </motion.div>

        {/* Review */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Stars */}
              <p className="text-gold text-2xl mb-6 tracking-widest">{'★'.repeat(r.stars)}</p>

              {/* Big decorative quote */}
              <div className="font-display font-bold text-[7rem] leading-none text-gold/10 absolute top-0 left-8 select-none pointer-events-none">"</div>

              <p className="font-display italic text-[clamp(1.1rem,2.5vw,1.5rem)] text-white/70 leading-relaxed mb-8 relative z-10">
                "{r.text}"
              </p>

              <div className="section-label text-gold">{r.author}</div>
              <div className="section-label text-white/25 mt-1">via Google Reviews · {r.branch}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-3 mt-12">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`transition-all duration-300 rounded-full ${i === idx ? 'w-8 h-[3px] bg-gold' : 'w-2 h-[3px] bg-white/20'}`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>

        {/* Google badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mt-8"
        >
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <span className="section-label text-white/30">Verified Google Reviews</span>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
