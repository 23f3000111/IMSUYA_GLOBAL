import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

function Counter({ end, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const step = end / (duration / 16)
    let cur = 0
    const t = setInterval(() => {
      cur += step
      if (cur >= end) { setVal(end); clearInterval(t) }
      else setVal(Math.floor(cur))
    }, 16)
    return () => clearInterval(t)
  }, [inView, end])

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

const STATS = [
  { value: 1200, suffix: '+', label: 'Happy Customers' },
  { value: 4.8,  suffix: '★', label: 'Average Rating', fixed: 1 },
  { value: 8,    suffix: '+', label: 'Services Offered' },
  { value: 99,   suffix: '%', label: 'Satisfaction Rate' },
]

const PLATFORMS = [
  { name: 'Google',   stars: 5, reviews: '800+ Reviews'   },
  { name: 'Grab',     stars: 5, reviews: '200+ Reviews'   },
  { name: 'Kaodim',   stars: 5, reviews: '#1 Priority'    },
  { name: 'MyReno',   stars: 4, reviews: '150+ Reviews'   },
  { name: 'Google',   stars: 5, reviews: '800+ Reviews'   },
  { name: 'Grab',     stars: 5, reviews: '200+ Reviews'   },
  { name: 'Kaodim',   stars: 5, reviews: '#1 Priority'    },
  { name: 'MyReno',   stars: 4, reviews: '150+ Reviews'   },
]

const fade = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-100">

      {/* ── Scrolling platform logos ── */}
      <div className="border-b border-gray-100 py-4 overflow-hidden">
        <div className="marquee-track gap-12 px-6">
          {PLATFORMS.map((p, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0 pr-12">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black font-display"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
                {p.name[0]}
              </div>
              <div>
                <div className="text-gray-800 text-sm font-semibold leading-tight">{p.name}</div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: p.stars }).map((_, si) => (
                    <Star key={si} size={9} className="text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-gray-400 text-[10px] ml-1">{p.reviews}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Animated stats ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="section-wrap py-12 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100"
      >
        {STATS.map(({ value, suffix, label, fixed }) => (
          <motion.div key={label} variants={fade}
            className="flex flex-col items-center text-center py-2 lg:px-8">
            <div className="font-display font-black text-4xl lg:text-5xl gradient-text-dark">
              {fixed
                ? <span>{value.toFixed(fixed)}{suffix}</span>
                : <Counter end={value} suffix={suffix} />
              }
            </div>
            <div className="text-gray-500 text-sm mt-1.5 font-medium">{label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
