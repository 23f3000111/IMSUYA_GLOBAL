import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const REVIEWS = [
  {
    initials: 'AM',
    name: 'Ahmad Mirza',
    location: 'Petaling Jaya',
    service: 'Aircond Service',
    stars: 5,
    quote: "My aircond was barely cooling. Their technician came the next morning, cleaned everything top-to-bottom and recharged the gas. It's like new now. Will definitely book again — absolutely outstanding service!",
    color: 'from-sky-500 to-blue-600',
    bg: 'rgba(14,165,233,0.12)',
  },
  {
    initials: 'SL',
    name: 'Siti Liyana',
    location: 'Shah Alam',
    service: 'Deep Cleaning',
    stars: 5,
    quote: "The team was so professional and thorough. My whole house smells amazing and they cleaned areas I didn't even think of. The attention to detail was incredible. Highly recommend!",
    color: 'from-emerald-500 to-teal-600',
    bg: 'rgba(16,185,129,0.12)',
  },
  {
    initials: 'NR',
    name: 'Nurul Rashida',
    location: 'Subang Jaya',
    service: 'Sofa Cleaning',
    stars: 5,
    quote: "Used their sofa cleaning service for my 5-seater. The stains I thought were permanent are completely GONE. The technician was polite, tidy and worked really efficiently. An easy 10/10 from me.",
    color: 'from-violet-500 to-purple-600',
    bg: 'rgba(124,58,237,0.14)',
  },
  {
    initials: 'ZK',
    name: 'Zulhilmi Karim',
    location: 'Cheras',
    service: 'Plumbing',
    stars: 5,
    quote: "Had an urgent pipe burst at midnight. Called Mr Problem and someone was at my door within 2 hours. Problem fully fixed before morning. Real professionals — not cowboys. These guys are the real deal.",
    color: 'from-amber-500 to-orange-500',
    bg: 'rgba(245,158,11,0.12)',
  },
  {
    initials: 'RJ',
    name: 'Raznita Jalil',
    location: 'Ampang',
    service: 'Electrical',
    stars: 5,
    quote: "Booked through their website — super easy process. The electrician rewired 3 rooms safely and explained everything clearly. Pricing was transparent and fair with zero surprises.",
    color: 'from-rose-500 to-pink-600',
    bg: 'rgba(244,63,94,0.12)',
  },
  {
    initials: 'FH',
    name: 'Farid Husaini',
    location: 'Damansara',
    service: 'Office Cleaning',
    stars: 5,
    quote: "Used them for my office — 3 sessions now and the consistency is incredible. Same quality every single time, always on time. The team lead manages everything perfectly. My go-to company now.",
    color: 'from-indigo-500 to-violet-600',
    bg: 'rgba(99,102,241,0.12)',
  },
]

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({ x: dir < 0 ? 80 : -80, opacity: 0, scale: 0.96, transition: { duration: 0.4 } }),
}

/* ── Individual review card ── */
function ReviewCard({ review, index }) {
  return (
    <motion.div
      custom={index}
      variants={fade}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="group relative rounded-3xl p-6 lg:p-7 border border-white/8 flex flex-col gap-5
                 transition-all duration-400 cursor-default"
      style={{ background: review.bg, backdropFilter: 'blur(12px)' }}
    >
      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(124,58,237,0.4)' }} />

      {/* Quote icon */}
      <Quote size={28} className="text-purple-400/50 fill-purple-400/20 flex-shrink-0" />

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: review.stars }).map((_, i) => (
          <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-white/75 text-sm leading-relaxed flex-1 italic">
        "{review.quote}"
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/8">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${review.color} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-display font-bold text-xs">{review.initials}</span>
        </div>
        <div className="min-w-0">
          <div className="text-white text-sm font-semibold leading-tight truncate">{review.name}</div>
          <div className="text-white/40 text-xs mt-0.5">{review.location}</div>
        </div>
        <span className="ml-auto flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(124,58,237,0.25)', color: '#C4B5FD' }}>
          {review.service}
        </span>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [idx, setIdx]     = useState(0)
  const [dir, setDir]     = useState(1)
  const [paused, setPaused] = useState(false)
  const n = REVIEWS.length

  const go = useCallback((delta) => {
    setDir(delta)
    setIdx(prev => (prev + delta + n) % n)
  }, [n])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => go(1), 5000)
    return () => clearTimeout(t)
  }, [idx, paused, go])

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0D0A1F 0%, #1A0740 55%, #0A0219 100%)' }}>

      {/* Orbs */}
      <div className="orb w-[500px] h-[500px] -right-32 top-0 opacity-[0.14] animate-float"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
      <div className="orb w-[300px] h-[300px] left-0 bottom-0 opacity-[0.1] animate-float-delay"
        style={{ background: 'radial-gradient(circle, #A855F7, transparent 70%)' }} />

      <div className="section-wrap relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="section-badge-dark mb-4">Customer Reviews</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white mt-4 mb-3">
            Loved By <span className="gradient-text">1,200+</span> Homeowners
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3 flex-wrap">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={17} className="text-amber-400 fill-amber-400" />
            ))}
            <span className="text-white/50 text-sm ml-2">4.8 average across all platforms</span>
          </div>
        </motion.div>

        {/* Desktop: 3-column card grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REVIEWS.map((r, i) => (
            <ReviewCard key={r.name} review={r} index={i} />
          ))}
        </motion.div>

        {/* Mobile: carousel */}
        <div
          className="md:hidden"
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="relative overflow-hidden min-h-[340px] flex items-center">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={idx}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-start pt-2"
              >
                <ReviewCard review={REVIEWS[idx]} index={0} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i) }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === idx ? '24px' : '8px',
                    height: '8px',
                    background: i === idx ? 'linear-gradient(90deg,#7C3AED,#A855F7)' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)}
                className="w-9 h-9 rounded-xl border border-white/15 text-white/60 flex items-center justify-center
                           hover:border-purple-500 hover:text-white transition-all duration-300">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => go(1)}
                className="w-9 h-9 rounded-xl border border-white/15 text-white/60 flex items-center justify-center
                           hover:border-purple-500 hover:text-white transition-all duration-300">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Trust badge row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { name: 'Google',  score: '4.9', count: '800+' },
            { name: 'Grab',    score: '4.8', count: '200+' },
            { name: 'Kaodim', score: '5.0', count: '#1'    },
          ].map(p => (
            <div key={p.name} className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black font-display"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
                {p.name[0]}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{p.name}</div>
                <div className="text-white/45 text-xs">{p.score}★ · {p.count} reviews</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
