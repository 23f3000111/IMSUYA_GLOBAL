import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
  BadgeCheck, ReceiptText, Clock3, Shield,
  Star, MessageCircleMore, ThumbsUp, Truck,
} from 'lucide-react'

/* ── 3-D tilt wrapper ── */
function TiltCard({ children, className }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 260, damping: 26 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 260, damping: 26 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width  - 0.5)
    my.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const FEATURES = [
  {
    icon: BadgeCheck,
    title: 'Verified Professionals',
    desc: 'Every technician is background-checked, trained, and certified before joining our team.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: ReceiptText,
    title: 'Transparent Pricing',
    desc: 'No hidden fees. Get a clear quote upfront before we start any work.',
    color: 'from-sky-500 to-blue-600',
  },
  {
    icon: Clock3,
    title: 'Same-Day Booking',
    desc: 'Book online and get a confirmed slot within hours. We respect your time.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    desc: 'All services are covered by our comprehensive insurance policy for your peace of mind.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Star,
    title: '4.8 Star Rated',
    desc: 'Consistently rated 5 stars across Google, Grab and Kaodim by 1,200+ customers.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: MessageCircleMore,
    title: 'Fast WhatsApp Support',
    desc: 'Real humans ready to help. Average reply time under 3 minutes on WhatsApp.',
    color: 'from-indigo-500 to-violet-600',
  },
]

const fade = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #F5F3FF 0%, #ffffff 100%)' }}>
      <div className="section-wrap">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="section-badge mb-4">Why Choose Us</span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-gray-900 mt-4 mb-4">
            The Mr Problem <span className="gradient-text-dark">Difference</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We set the standard for home services — not just what we do, but how we do it.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} custom={i} variants={fade}>
            <TiltCard
              className="group bg-white rounded-3xl p-7 border border-gray-100 shadow-sm flex flex-col gap-4
                         transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-200/50 cursor-default h-full"
            >
              {/* Icon */}
              <div className={`why-icon-wrap w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-md
                               transition-transform duration-300 group-hover:scale-110`}>
                <f.icon size={26} className="text-white" />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-1.5">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>

              {/* Decorative line */}
              <div className={`h-0.5 w-10 rounded-full bg-gradient-to-r ${f.color} opacity-60
                               transition-all duration-300 group-hover:w-20 group-hover:opacity-100`} />
            </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
