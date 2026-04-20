import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Home, Wind, Sparkles, Droplets, Zap,
  Wrench, Sofa, Building2, ArrowUpRight,
} from 'lucide-react'

const SERVICES = [
  {
    icon: Home,
    name: 'House Cleaning',
    desc: 'Thorough top-to-bottom cleaning that leaves every room spotless and fresh.',
    badge: 'Most Popular',
    color: 'from-violet-500 to-purple-600',
    img: '/images/house-cleaning.webp',
  },
  {
    icon: Wind,
    name: 'Aircond Service',
    desc: 'Full clean, gas top-up & servicing for all major brands. Stay cool all year.',
    badge: 'Hot Pick',
    color: 'from-sky-500 to-blue-600',
    img: '/images/aircond-cleaning.webp',
  },
  {
    icon: Sparkles,
    name: 'Deep Cleaning',
    desc: 'Industrial-grade deep clean for kitchens, bathrooms and heavily soiled spaces.',
    badge: 'Premium',
    color: 'from-emerald-500 to-teal-600',
    img: '/images/deep-cleaning.webp',
  },
  {
    icon: Droplets,
    name: 'Plumbing',
    desc: 'Leaks, clogs, pipe repairs and bathroom upgrades — done right the first time.',
    badge: 'Fast Fix',
    color: 'from-blue-500 to-cyan-600',
    img: '/images/plumbing.webp',
  },
  {
    icon: Zap,
    name: 'Electrical',
    desc: 'Safe, certified electrical works for homes and offices. Transparent pricing.',
    badge: 'Certified',
    color: 'from-amber-500 to-orange-500',
    img: '/images/electrical.webp',
  },
  {
    icon: Wrench,
    name: 'Handyman',
    desc: 'Furniture assembly, wall repairs, painting — no job too big or too small.',
    badge: 'Flexible',
    color: 'from-rose-500 to-pink-600',
    img: '/images/handyman.jpg',
  },
  {
    icon: Sofa,
    name: 'Sofa Cleaning',
    desc: 'Remove deep-set stains, allergens and odours from sofas, mattresses & carpets.',
    badge: 'New',
    color: 'from-purple-500 to-fuchsia-600',
    img: '/images/sofa-cleaning.webp',
  },
  {
    icon: Building2,
    name: 'Office Cleaning',
    desc: 'Consistent, discreet office cleaning plans that keep your workspace productive.',
    badge: 'Business',
    color: 'from-indigo-500 to-violet-600',
    img: '/images/office-cleaning.jpg',
  },
]

const fade = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Spotlight mouse tracker ─── */
function useSpotlight(gridRef) {
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const move = (e) => {
      el.querySelectorAll('.spotlight-card').forEach(card => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      })
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])
}

/* ── Service card ─── */
function Card({ svc, index }) {
  const { icon: Icon, name, desc, badge, color, img, imgBg } = svc
  return (
    <motion.div
      custom={index}
      variants={fade}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="spotlight-card grad-border-card group flex flex-col border border-gray-100 shadow-sm cursor-default overflow-hidden"
      style={{ borderRadius: '1.25rem' }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: '160px' }}>
        {img ? (
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            style={{ objectPosition: 'center center' }}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${color} flex items-center justify-center`}>
            <Icon size={56} className="text-white/25" />
          </div>
        )}
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Badge over image */}
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full
                         bg-white/90 text-purple-700 shadow-sm backdrop-blur-sm">
          {badge}
        </span>
        {/* Icon overlay bottom-left */}
        <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${color}
                         flex items-center justify-center shadow-lg`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        <h3 className="font-display font-bold text-gray-900 text-[1.05rem] leading-tight">{name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>

        {/* CTA */}
        <a
          href="https://mrproblemshop.com/"
          className="inline-flex items-center gap-1.5 text-purple-600 text-sm font-semibold group/link mt-2"
        >
          Book Now
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const gridRef = useRef(null)
  useSpotlight(gridRef)

  return (
    <section id="services" className="py-24 lg:py-32 bg-gray-50/60">
      <div className="section-wrap">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="section-badge mb-4">Our Services</span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-gray-900 mt-4 mb-4">
            One App, Every <span className="gradient-text-dark">Home Need</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From routine cleans to emergency repairs — expert help is just a tap away.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {SERVICES.map((svc, i) => (
            <Card key={svc.name} svc={svc} index={i} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a href="https://mrproblemshop.com/" className="btn-primary">
            Book Any Service <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
