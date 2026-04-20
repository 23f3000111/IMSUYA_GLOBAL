import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Star, Award, Clock, ThumbsUp } from 'lucide-react'

/* ── Animated counter ──────────────── */
function Counter({ target, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const step = target / (duration / 16)
    let cur = 0
    const t = setInterval(() => {
      cur += step
      if (cur >= target) { setVal(target); clearInterval(t) }
      else setVal(cur)
    }, 16)
    return () => clearInterval(t)
  }, [inView, target])

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString()}{suffix}
    </span>
  )
}

const STATS = [
  { Icon: Users,    target: 1200, suffix: '+', prefix: '',  label: 'Happy Customers',     sub: 'Across Klang Valley'       },
  { Icon: Star,     target: 4.8,  suffix: '★', prefix: '',  label: 'Average Rating',       sub: 'Google, Grab & Kaodim',    decimals: 1 },
  { Icon: Clock,    target: 30,   suffix: 'min', prefix: '', label: 'Avg Response Time',   sub: 'From booking to confirm'   },
  { Icon: ThumbsUp, target: 99,   suffix: '%', prefix: '',  label: 'Satisfaction Rate',    sub: 'Would recommend us'        },
  { Icon: Award,    target: 6,    suffix: '+', prefix: '',  label: 'Years of Excellence',  sub: 'Industry experience'       },
  { Icon: TrendingUp, target: 8,  suffix: 'k+', prefix: '', label: 'Jobs Completed',       sub: 'And counting'              },
]

const fade = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Results() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #07001A 0%, #1E0A50 60%, #0C0328 100%)' }}>

      {/* Decorative orbs */}
      <div className="orb w-[600px] h-[600px] -left-40 top-0 opacity-[0.18]"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
      <div className="orb w-[400px] h-[400px] right-0 bottom-0 opacity-[0.15] animate-float-slow"
        style={{ background: 'radial-gradient(circle, #A855F7, transparent 70%)' }} />

      <div className="section-wrap relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="section-badge-dark mb-4">Real Results</span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white mt-4 mb-4">
            Numbers That <span className="gradient-text">Speak For Us</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Over six years of consistent excellence, trusted by thousands of homeowners.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {STATS.map(({ Icon, target, suffix, prefix, label, sub, decimals }, i) => (
            <motion.div
              key={label}
              custom={i}
              variants={fade}
              className="group relative rounded-3xl p-7 border border-white/8 backdrop-blur-sm overflow-hidden
                         transition-all duration-400 hover:border-purple-500/40 hover:bg-white/5"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.15), transparent 70%)' }} />

              <div className="relative z-10 flex flex-col gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(124,58,237,0.25)' }}>
                  <Icon size={20} className="text-purple-300" />
                </div>

                <div className="font-display font-black text-3xl lg:text-4xl text-white leading-none">
                  <Counter target={target} suffix={suffix} prefix={prefix} decimals={decimals ?? 0} />
                </div>

                <div>
                  <div className="text-white/90 font-semibold text-sm">{label}</div>
                  <div className="text-white/35 text-xs mt-0.5">{sub}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 rounded-3xl p-8 lg:p-10 text-center border border-purple-500/25"
          style={{ background: 'rgba(124,58,237,0.12)', backdropFilter: 'blur(12px)' }}
        >
          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto italic">
            "Mr Problem is the only home service company I trust completely — fast, fair, and always professional."
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold font-display">ZK</div>
            <span className="text-purple-300 text-sm font-semibold">Zulhilmi K. — Cheras</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
