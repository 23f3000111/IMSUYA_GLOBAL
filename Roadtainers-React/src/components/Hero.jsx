import { motion } from 'framer-motion';
import { GEO_MINI } from '../geoData.js';
import { Star, Truck, Award, Clock, ArrowRight, MapPin, CheckCircle } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

// Deterministic floating particles
const particles = Array.from({ length: 22 }, (_, i) => ({
  x: ((i * 17.3 + 5) % 95) + 2.5,
  y: ((i * 11.7 + 8) % 90) + 5,
  delay: (i * 0.31) % 3,
  duration: 2.5 + (i * 0.19) % 2,
  size: i % 3 === 0 ? 2 : 1.5,
}));

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient"
    >
      {/* Real hero background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/Roadtainers_hero.jpg"
          alt="Roadtainers fleet"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/95 via-brand-deep/85 to-brand-deep/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-brand-deep/40" />
      </div>

      {/* ── Background grid pattern ── */}
      <div className="absolute inset-0 opacity-[0.04] z-[1]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [-12, 12], opacity: [0.08, 0.4, 0.08] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none z-[1]" />

      {/* pt = 40px bar + 68px nav = 108px */}
      <div className="container-xl relative z-10 pt-[128px] pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT CONTENT ── */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col">

            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full">
                <Star size={12} className="text-brand-yellow" fill="currentColor" />
                Trusted Since 1998
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.04] tracking-tight text-white mb-6">
              Moving Africa's
              <br />
              Cargo With{' '}
              <motion.span
                className="text-brand-yellow inline-block"
                animate={{ textShadow: ['0 0 20px #FACC1540','0 0 40px #FACC1580','0 0 20px #FACC1540'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >Power</motion.span>
              <br />
              <span className="text-white/90">&amp; Precision.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp}
              className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-xl mb-8">
              Heavy transport, container logistics, transit facilities, tankers,
              cranes and fleet solutions built for East Africa's most demanding corridors.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
              <motion.a
                href={SITE} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="btn-primary text-base shadow-glow-yellow"
              >
                Get a Quote
              </motion.a>
              <motion.a
                href="#network"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-outline-white text-base"
              >
                Explore Network <ArrowRight size={16} />
              </motion.a>
            </motion.div>

            {/* Quick stats */}
            <motion.div variants={fadeUp}
              className="flex flex-wrap gap-6 pt-8 border-t border-white/10">
              {[
                { icon: Truck,   value: '140+', label: 'Fleet Units' },
                { icon: Award,   value: '25+',  label: 'Years Experience' },
                { icon: Clock,   value: '24/7', label: 'Dispatch Ready' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                    <stat.icon size={18} className="text-brand-yellow" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl leading-tight">{stat.value}</div>
                    <div className="text-white/50 text-xs font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT VISUAL — Live Africa Operations Dashboard ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.93 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Glass dashboard */}
            <div className="relative rounded-3xl bg-black/30 backdrop-blur-xl border border-white/15 p-6 shadow-2xl overflow-hidden">
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-green/10 to-transparent pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-0.5">Live Operations</p>
                  <h3 className="text-white font-bold text-lg">East Africa Network</h3>
                </div>
                <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-3 py-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-300 text-xs font-semibold">Live</span>
                </div>
              </div>

              {/* Real East Africa map ? Natural Earth + d3-geo projection */}
              <div className="relative rounded-2xl overflow-hidden mb-4 border border-white/5"
                   style={{ background: 'linear-gradient(160deg,#020c08,#041510)' }}>
                <svg viewBox="0 0 600 480" className="w-full h-auto">
                  <defs>
                    <clipPath id="hero-v1-clip"><rect x="0" y="0" width="600" height="480"/></clipPath>
                    <radialGradient id="hero-v1-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FACC15" stopOpacity="0.55"/>
                      <stop offset="100%" stopColor="#FACC15" stopOpacity="0"/>
                    </radialGradient>
                    <filter id="hero-v1-blur"><feGaussianBlur stdDeviation="8"/></filter>
                  </defs>
                  <rect width="600" height="480" fill="#020c08"/>
                  <g clipPath={`url(#hero-v1-clip)`}>
                    {/* Context */}
                    <path d={GEO_MINI.Somalia} fill="#0c2216" fillOpacity="0.65" stroke="#1c3d28" strokeWidth="0.35"/>
                    {/* Operational */}
                    <path d={GEO_MINI.DRC}        fill="#0F7B46" fillOpacity="0.18" stroke="#2ddf80" strokeWidth="0.7" strokeOpacity="0.80"/>
                    <path d={GEO_MINI.SouthSudan}  fill="#0F7B46" fillOpacity="0.22" stroke="#2ddf80" strokeWidth="0.8" strokeOpacity="0.80"/>
                    <path d={GEO_MINI.Ethiopia}    fill="#0F7B46" fillOpacity="0.25" stroke="#2ddf80" strokeWidth="0.8" strokeOpacity="0.80"/>
                    <path d={GEO_MINI.Uganda}      fill="#0F7B46" fillOpacity="0.30" stroke="#22c55e" strokeWidth="0.9" strokeOpacity="0.80"/>
                    <path d={GEO_MINI.Rwanda}      fill="#0F7B46" fillOpacity="0.32" stroke="#22c55e" strokeWidth="0.9" strokeOpacity="0.80"/>
                    <path d={GEO_MINI.Burundi}     fill="#0F7B46" fillOpacity="0.32" stroke="#22c55e" strokeWidth="0.9" strokeOpacity="0.80"/>
                    <path d={GEO_MINI.Tanzania}    fill="#0F7B46" fillOpacity="0.28" stroke="#22c55e" strokeWidth="1.0" strokeOpacity="0.80"/>
                    <path d={GEO_MINI.Kenya}       fill="#0F7B46" fillOpacity="0.40" stroke="#34d399" strokeWidth="1.2" strokeOpacity="0.90"/>
                    {/* Lake Victoria */}
                    <ellipse cx="241" cy="272" rx="33" ry="37" fill="#0d3a5e" fillOpacity="0.75" stroke="#1d6fa8" strokeWidth="0.7" strokeOpacity="0.60"/>
                    <text x="241" y="276" textAnchor="middle" fontSize="6" fontStyle="italic" fill="rgba(130,200,255,0.50)" fontFamily="Inter,sans-serif">L. Victoria</text>
                    {/* Country labels */}
                    <text x="370" y="238" textAnchor="middle" fill="rgba(255,255,255,0.70)" fontSize="10"   fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">KENYA</text>
                    <text x="286" y="408" textAnchor="middle" fill="rgba(255,255,255,0.62)" fontSize="9.5"  fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">TANZANIA</text>
                    <text x="208" y="216" textAnchor="middle" fill="rgba(255,255,255,0.60)" fontSize="9"    fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">UGANDA</text>
                    <text x="394" y="60"  textAnchor="middle" fill="rgba(255,255,255,0.56)" fontSize="9.5"  fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">ETHIOPIA</text>
                    <text x="170" y="87"  textAnchor="middle" fill="rgba(255,255,255,0.52)" fontSize="8.5"  fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">S. SUDAN</text>
                    <text x="148" y="290" textAnchor="middle" fill="rgba(255,255,255,0.52)" fontSize="7"    fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">RWANDA</text>
                  </g>
                  {/* Nairobi hub glow */}
                  <circle cx="331" cy="280" r="28" fill={`url(#hero-v1-glow)`} filter={`url(#hero-v1-blur)`}/>
                  {/* Route lines */}
                  <path d="M398,346 Q381,293 331,280" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M376,37 Q370,159 331,280"  fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M331,280 Q280,261 231,242" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M231,242 Q220,189 208,136" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M331,280 Q330,305 328,329" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M328,329 Q358,370 388,410" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M331,280 Q280,288 172,296" fill="none" stroke="#0F7B46" strokeWidth="1.2" strokeDasharray="5 4" strokeOpacity="0.50"/>
                  {/* Animated cargo dots */}
                  <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0s"   path="M398,346 Q381,293 331,280"/></circle>
                  <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="5s"   repeatCount="indefinite" begin="0s"   path="M376,37 Q370,159 331,280"/></circle>
                  <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.8s" repeatCount="indefinite" begin="0.8s" path="M331,280 Q280,261 231,242"/></circle>
                  <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0.7s" path="M331,280 Q330,305 328,329"/></circle>
                  <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.5s" repeatCount="indefinite" begin="1.1s" path="M328,329 Q358,370 388,410"/></circle>
                  {/* City markers ? hub cities with pulse */}
                  <circle cx="331" cy="280" r="20" fill="none" stroke="#FACC15" strokeWidth="1.2" opacity="0"><animate attributeName="r" values="12;24;12" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite"/></circle>
                  <circle cx="331" cy="280" r="6"  fill="#FACC15" stroke="#fff" strokeWidth="2"/>
                  <text x="342" y="284" fill="rgba(255,255,255,0.95)" fontSize="9.5" fontWeight="700" fontFamily="Inter,sans-serif">Nairobi</text>
                  <circle cx="398" cy="346" r="5"  fill="#FACC15" stroke="#fff" strokeWidth="1.5"/>
                  <text x="406" y="350" fill="rgba(255,255,255,0.90)" fontSize="8.5" fontWeight="700" fontFamily="Inter,sans-serif">Mombasa</text>
                  <circle cx="388" cy="410" r="5"  fill="#FACC15" stroke="#fff" strokeWidth="1.5"/>
                  <text x="350" y="406" fill="rgba(255,255,255,0.88)" fontSize="8.5" fontWeight="700" fontFamily="Inter,sans-serif">Dar es Salaam</text>
                  <circle cx="231" cy="242" r="4.5" fill="#2ddf80" stroke="#FACC15" strokeWidth="1.5"/>
                  <text x="238" y="238" fill="rgba(255,255,255,0.70)" fontSize="8" fontWeight="500" fontFamily="Inter,sans-serif">Kampala</text>
                  <circle cx="376" cy="37"  r="4.5" fill="#2ddf80" stroke="#FACC15" strokeWidth="1.5"/>
                  <text x="383" y="41"  fill="rgba(255,255,255,0.70)" fontSize="8" fontWeight="500" fontFamily="Inter,sans-serif">Addis</text>
                  <circle cx="208" cy="136" r="4"   fill="#2ddf80" stroke="#FACC15" strokeWidth="1.5"/>
                  <text x="214" y="140" fill="rgba(255,255,255,0.65)" fontSize="8" fontWeight="500" fontFamily="Inter,sans-serif">Juba</text>
                  <circle cx="328" cy="329" r="4"   fill="#2ddf80" stroke="#FACC15" strokeWidth="1.5"/>
                  <text x="334" y="325" fill="rgba(255,255,255,0.65)" fontSize="8" fontWeight="500" fontFamily="Inter,sans-serif">Arusha</text>
                  <circle cx="172" cy="296" r="3.5" fill="#2ddf80" stroke="#FACC15" strokeWidth="1"/>
                  <text x="178" y="300" fill="rgba(255,255,255,0.60)" fontSize="7.5" fontWeight="500" fontFamily="Inter,sans-serif">Kigali</text>
                </svg>
              </div>

              {/* Stats row */}

              <div className="grid grid-cols-3 gap-3 relative z-10">
                {[
                  { val:'140+', label:'Active Units',  color:'text-brand-yellow' },
                  { val:'8',    label:'Countries',      color:'text-green-400'   },
                  { val:'24/7', label:'Support',        color:'text-blue-300'    },
                ].map((s,i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 text-center border border-white/8">
                    <div className={`text-lg font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-white/40 text-[10px] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating stat cards */}
            <motion.div
              animate={{ y:[0,-9,0] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
              className="absolute -left-12 top-1/4 bg-white rounded-2xl shadow-2xl p-4 border border-gray-50 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">
                  <Truck size={20} className="text-brand-green" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">140+</div>
                  <div className="text-xs text-gray-400 font-medium">Fleet Units</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y:[0,-11,0] }} transition={{ duration:4, delay:1.5, repeat:Infinity, ease:'easeInOut' }}
              className="absolute -right-10 bottom-1/4 bg-white rounded-2xl shadow-2xl p-4 border border-gray-50 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <CheckCircle size={20} className="text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">98%</div>
                  <div className="text-xs text-gray-400 font-medium">On-Time Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y:[0,-7,0] }} transition={{ duration:3, delay:0.8, repeat:Infinity, ease:'easeInOut' }}
              className="absolute -right-8 top-10 bg-white rounded-2xl shadow-2xl p-3.5 border border-gray-50 z-20"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                  <MapPin size={16} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">GPS Tracked</div>
                  <div className="text-[10px] text-gray-400">Real-time visibility</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 sm:h-16">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}
