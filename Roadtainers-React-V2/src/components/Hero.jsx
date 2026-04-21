import { useEffect, useRef, useState } from 'react';
import { GEO_MINI } from '../geoData.js';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

/* ── Animated route lines SVG background ────────────────────────────── */
const NODES = [
  { x: 120,  y: 140 },
  { x: 340,  y: 80  },
  { x: 600,  y: 200 },
  { x: 880,  y: 130 },
  { x: 1180, y: 260 },
  { x: 1380, y: 160 },
  { x: 200,  y: 400 },
  { x: 460,  y: 480 },
  { x: 720,  y: 380 },
  { x: 960,  y: 500 },
  { x: 1200, y: 440 },
  { x: 80,   y: 620 },
  { x: 380,  y: 680 },
  { x: 700,  y: 720 },
  { x: 1050, y: 650 },
  { x: 1380, y: 700 },
];

const ROUTES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],
  [6,7],[7,8],[8,9],[9,10],
  [11,12],[12,13],[13,14],[14,15],
  [0,6],[1,7],[2,8],[3,9],[4,10],
  [6,11],[7,12],[8,13],[9,14],[10,15],
  [1,8],[3,8],[8,14],
];

const CARGO = [
  { path: 'M120,140 Q360,80 600,200',     dur: '4s',  begin: '0s'   },
  { path: 'M600,200 Q740,165 880,130',    dur: '3s',  begin: '1s'   },
  { path: 'M880,130 Q1030,195 1180,260',  dur: '3.5s',begin: '0.5s' },
  { path: 'M200,400 Q330,440 460,480',    dur: '4s',  begin: '1.5s' },
  { path: 'M460,480 Q590,430 720,380',    dur: '3.5s',begin: '2s'   },
  { path: 'M720,380 Q840,440 960,500',    dur: '4s',  begin: '0.8s' },
  { path: 'M380,680 Q540,700 700,720',    dur: '5s',  begin: '0.2s' },
  { path: 'M700,720 Q875,685 1050,650',   dur: '4.5s',begin: '1.8s' },
];

/* ── Animated counter ─────────────────────────────────────────────── */
function Counter({ to, suffix = '', inView }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const step = to / steps;
    let cur = 0;
    const id = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(cur));
    }, 30);
    return () => clearInterval(id);
  }, [to, inView]);
  return <>{val}{suffix}</>;
}

export default function Hero() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setInView(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  /* Stagger text animation */
  const words = ['Logistics', 'Built', 'For', 'Scale.'];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #020D06 0%, #041510 40%, #020D06 100%)' }}
    >
      {/* ── Gradient orbs ── */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none animate-orb"
        style={{ background: 'radial-gradient(circle, rgba(15,123,70,0.18) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[700px] h-[500px] rounded-full pointer-events-none animate-orb-r"
        style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.07) 0%, transparent 70%)' }} />
      <div className="absolute top-10 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none animate-orb"
        style={{ background: 'radial-gradient(circle, rgba(15,123,70,0.1) 0%, transparent 70%)', animationDelay: '3s' }} />

      {/* ── Animated route network SVG ── */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.7" fill="rgba(255,255,255,0.06)" />
          </pattern>
        </defs>

        {/* Dot grid */}
        <rect width="1440" height="800" fill="url(#hero-grid)" />

        {/* Route lines */}
        {ROUTES.map(([a, b], i) => {
          const na = NODES[a]; const nb = NODES[b];
          const mx = (na.x + nb.x) / 2;
          const my = (na.y + nb.y) / 2 - 18;
          return (
            <path
              key={i}
              d={`M${na.x},${na.y} Q${mx},${my} ${nb.x},${nb.y}`}
              fill="none"
              stroke="#0F7B46"
              strokeWidth="1"
              strokeOpacity="0.35"
              strokeDasharray="2000"
              strokeDashoffset="2000"
              style={{ animation: `drawRoute 3.5s ease-out ${(i * 0.15).toFixed(2)}s forwards` }}
            />
          );
        })}

        {/* Cargo dots */}
        {CARGO.map((c, i) => (
          <circle key={i} r="3" fill="#FACC15" opacity="0.85">
            <animateMotion dur={c.dur} repeatCount="indefinite" begin={c.begin} path={c.path} />
          </circle>
        ))}

        {/* Nodes */}
        {NODES.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="3.5" fill="#0F7B46" stroke="#FACC15" strokeWidth="1" opacity="0.6" />
            <circle cx={n.x} cy={n.y} r="8" fill="none" stroke="#0F7B46" strokeWidth="0.8" opacity="0.25">
              <animate attributeName="r" values="5;12;5" dur="3s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Main hero content */}
        <div className="wrap-xl flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-28 lg:pt-36 pb-16">

          {/* LEFT — Text */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <span className="badge-v2 bg-v2-green/15 text-v2-yellow border border-v2-green/30">
                <span className="w-1.5 h-1.5 rounded-full bg-v2-yellow animate-dot-pulse" />
                Trusted Since 1998
              </span>
            </motion.div>

            {/* Headline — word by word reveal */}
            <div className="heading-display text-white mb-6 overflow-hidden">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ y: '120%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block mr-[0.2em] ${word === 'Scale.' ? 'text-grad-hero' : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="text-white/55 text-lg lg:text-xl leading-relaxed max-w-lg mb-10"
            >
              Heavy transport, container logistics, cross-border operations and fleet power built for East Africa's most demanding corridors.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.7 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <a href={SITE} target="_blank" rel="noopener noreferrer" className="btn-yellow text-base px-8 py-4">
                Get Quote <ArrowRight size={16} />
              </a>
              <a href="#network" className="btn-ghost-white text-base px-8 py-4">
                Explore Network
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { val: 140, suffix: '+', label: 'Fleet Units' },
                { val: 25,  suffix: '+', label: 'Years Experience' },
                { val: 8,   suffix: '',  label: 'Countries' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl font-black text-white">
                    <Counter to={s.val} suffix={s.suffix} inView={inView} />
                  </span>
                  <span className="text-white/40 text-sm font-medium mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Live Operations dashboard card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 w-full lg:w-[420px]"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10"
              style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', backdropFilter: 'blur(20px)' }}>

              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-v2-green animate-pulse"/>
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">Live Operations</span>
                </div>
                <span className="text-white/30 text-xs">24 / 7</span>
              </div>

              {/* East Africa map */}
              <div className="relative rounded-2xl overflow-hidden mb-4 border border-white/5"
                   style={{ background: 'linear-gradient(160deg,#020c08,#041510)' }}>
                <svg viewBox="0 0 600 480" className="w-full h-auto">
                  <defs>
                    <clipPath id="hero-v2-clip"><rect x="0" y="0" width="600" height="480"/></clipPath>
                    <radialGradient id="hero-v2-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FACC15" stopOpacity="0.55"/>
                      <stop offset="100%" stopColor="#FACC15" stopOpacity="0"/>
                    </radialGradient>
                    <filter id="hero-v2-blur"><feGaussianBlur stdDeviation="8"/></filter>
                  </defs>
                  <rect width="600" height="480" fill="#020c08"/>
                  <g clipPath={"url(#hero-v2-clip)"}>
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
                  <circle cx="331" cy="280" r="28" fill={"url(#hero-v2-glow)"} filter={"url(#hero-v2-blur)"}/>
                  {/* Route paths */}
                  <path d="M398,346 Q381,293 331,280" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M376,37 Q370,159 331,280"  fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M331,280 Q280,261 231,242" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M231,242 Q220,189 208,136" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M331,280 Q330,305 328,329" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  <path d="M328,329 Q358,370 388,410" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
                  {/* Animated cargo dots */}
                  <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0s"   path="M398,346 Q381,293 331,280"/></circle>
                  <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="5s"   repeatCount="indefinite" begin="0s"   path="M376,37 Q370,159 331,280"/></circle>
                  <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.8s" repeatCount="indefinite" begin="0.8s" path="M331,280 Q280,261 231,242"/></circle>
                  <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0.7s" path="M331,280 Q330,305 328,329"/></circle>
                  <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.5s" repeatCount="indefinite" begin="1.1s" path="M328,329 Q358,370 388,410"/></circle>
                  {/* Hub pulse */}
                  <circle cx="331" cy="280" r="20" fill="none" stroke="#FACC15" strokeWidth="1.2" opacity="0"><animate attributeName="r" values="12;24;12" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite"/></circle>
                  {/* City markers */}
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

              {/* Bottom stats */}
              <div className="grid grid-cols-3 gap-0 divide-x divide-white/8 border-t border-white/8">
                {[
                  { val: '140+',  label: 'Active Units' },
                  { val: '98%',   label: 'On-Time Rate'  },
                  { val: '24/7',  label: 'GPS Tracking'  },
                ].map((s, i) => (
                  <div key={i} className="py-4 px-3 text-center">
                    <div className="text-v2-yellow font-black text-xl">{s.val}</div>
                    <div className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-5 glass-dark px-4 py-3 shadow-xl"
            >
              <div className="text-v2-yellow font-black text-lg leading-none">25+</div>
              <div className="text-white/50 text-[10px] font-semibold uppercase tracking-wide">Years Exp.</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="flex justify-center pb-8"
        >
          <a href="#story" className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors">
            <span className="text-[11px] font-semibold uppercase tracking-widest">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown size={18} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
