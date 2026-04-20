import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Star, Shield, Zap, CheckCircle2, Phone } from 'lucide-react'

/* ── Particle canvas ─────────────────────────────────────────── */
function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const W = () => canvas.width
    const H = () => canvas.height

    const pts = Array.from({ length: 70 }, () => ({
      x:  Math.random() * W(),
      y:  Math.random() * H(),
      r:  Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.18,
      a:  Math.random() * 0.3 + 0.06,
    }))

    function draw() {
      ctx.clearRect(0, 0, W(), H())
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167,139,250,${p.a})`
        ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0) p.x = W(); if (p.x > W()) p.x = 0
        if (p.y < 0) p.y = H(); if (p.y > H()) p.y = 0
      })

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.hypot(dx, dy)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(124,58,237,${0.07 * (1 - d / 90)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="particle-canvas" />
}

/* ── Animation variants ──────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1]

const stagger = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
}
const fadeRight = {
  initial: { opacity: 0, x: 60, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 1, delay: 0.2, ease } },
}

/* ── Floating chip component ─────────────────────────────────── */
function Chip({ children, className = '', delay = 0, yAmp = 8 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -yAmp, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ── Main Hero ───────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[104px]"
      style={{ background: 'linear-gradient(145deg, #07001A 0%, #1E0A50 55%, #0C0328 100%)' }}
    >
      <Particles />

      {/* Decorative orbs */}
      <div className="orb w-[700px] h-[700px] -top-48 -left-40 opacity-[0.22]"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
      <div className="orb w-[500px] h-[500px] top-1/3 -right-32 opacity-[0.15] animate-float-slow"
        style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 65%)' }} />
      <div className="orb w-[300px] h-[300px] bottom-0 left-1/4 opacity-[0.1] animate-float-delay"
        style={{ background: 'radial-gradient(circle, #6D28D9 0%, transparent 70%)' }} />

      {/* Content grid */}
      <div className="section-wrap relative z-10 grid lg:grid-cols-2 gap-10 xl:gap-20 items-center
                      pt-32 pb-16 lg:pt-36 lg:pb-28">

        {/* ── LEFT ── */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-6 lg:gap-7 order-2 lg:order-1"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="section-badge-dark">
              <Star size={11} className="text-amber-400 fill-amber-400 flex-shrink-0" />
              #1 Trusted Home Services in Klang Valley
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-black leading-[1.04] tracking-tight text-white
                       text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Every&nbsp;Problem,
            <br />
            <span className="gradient-text">Made&nbsp;Easy.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="text-white/55 text-base sm:text-lg leading-relaxed max-w-[460px]"
          >
            Cleaning, Aircond, Plumbing, Electrical &amp; more — trusted by{' '}
            <span className="text-purple-300 font-semibold">1,200+ happy customers</span> across Klang Valley.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
            <a href="https://mrproblemshop.com/" className="btn-primary">
              Book a Service <ArrowRight size={15} />
            </a>
            <a href="#services" className="btn-ghost">
              See Services <ChevronRight size={15} />
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/10"
          >
            {[
              { Icon: Star,         text: '4.8 Rating',   sub: '1,200+ Reviews' },
              { Icon: Zap,          text: 'Same Day',      sub: 'Available Now'  },
              { Icon: CheckCircle2, text: 'Verified Pros', sub: 'Fully Insured'  },
            ].map(({ Icon, text, sub }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(124,58,237,0.3)' }}>
                  <Icon size={14} className="text-purple-300" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold leading-tight">{text}</div>
                  <div className="text-white/38 text-[11px] mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div variants={fadeUp}>
            <a
              href="https://wa.me/60123456789"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-green-500/30
                         text-green-400 text-sm font-semibold hover:bg-green-500/10 transition-colors duration-300"
            >
              <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Phone size={12} className="text-white" />
              </span>
              Chat on WhatsApp — instant reply
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: hero image ── */}
        <motion.div
          variants={fadeRight}
          initial="initial"
          animate="animate"
          className="relative flex items-center justify-center order-1 lg:order-2"
        >
          {/* Glow halo */}
          <div
            className="absolute inset-8 rounded-[2rem] blur-3xl opacity-40 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.8), transparent 70%)' }}
          />

          {/* Main image card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full"
          >
            <div
              className="relative rounded-[2rem] overflow-hidden img-shine"
              style={{
                boxShadow: '0 0 0 1px rgba(124,58,237,0.4), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.2)',
              }}
            >
              <img
                src="/images/hero_image.png"
                alt="Mr Problem Professional Team"
                className="w-full object-cover"
                style={{ height: 'clamp(280px, 48vw, 560px)', objectPosition: 'center top' }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(14,2,40,0.72) 0%, rgba(14,2,40,0.1) 42%, transparent 65%)' }}
              />
              {/* Bottom label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="rounded-2xl px-4 py-3 border border-white/15 backdrop-blur-md"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <p className="text-white font-semibold text-sm leading-tight">Premium Home Services</p>
                  <p className="text-purple-200 text-xs mt-0.5">Klang Valley's Most Trusted</p>
                </div>
              </div>
            </div>

            {/* Chip: Rating — top left */}
            <Chip delay={1.1} yAmp={7} className="absolute -top-5 -left-4 sm:-left-10 z-20">
              <div
                className="bg-white rounded-2xl flex items-center gap-3 pl-3 pr-4 py-3"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(124,58,237,0.1)' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #FCD34D)' }}
                >
                  <Star size={15} className="text-white fill-white" />
                </div>
                <div>
                  <div className="font-display font-black text-gray-900 text-base leading-none">4.8</div>
                  <div className="text-gray-400 text-[10px] mt-0.5">1,200+ Reviews</div>
                </div>
              </div>
            </Chip>

            {/* Chip: #1 Vendor — right mid */}
            <Chip delay={1.35} yAmp={9} className="absolute -right-4 sm:-right-10 top-[35%] z-20">
              <div
                className="rounded-2xl flex items-center gap-2.5 px-3.5 py-3"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                  boxShadow: '0 12px 40px rgba(124,58,237,0.45)',
                }}
              >
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Shield size={13} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm leading-none">#1 Vendor</div>
                  <div className="text-purple-200 text-[10px] mt-0.5">Kaodim Platform</div>
                </div>
              </div>
            </Chip>

            {/* Chip: Insured — bottom left */}
            <Chip delay={1.6} yAmp={6} className="absolute -left-3 sm:-left-8 bottom-20 z-20">
              <div
                className="rounded-xl flex items-center gap-2 px-3.5 py-2.5 border border-white/20 backdrop-blur-md"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <CheckCircle2 size={13} className="text-green-400 flex-shrink-0" />
                <span className="text-white text-xs font-semibold whitespace-nowrap">Fully Insured</span>
              </div>
            </Chip>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-[3px] h-2 bg-purple-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
