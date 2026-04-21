import { useState, useEffect, useRef, useCallback } from 'react';
import { GEO_MINI } from '../geoData.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Package, Globe, Gauge, Shield, ChevronRight, Check } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

/* ─── Step data ─────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: '01', visual: 'heavy', icon: Truck, accent: '#FACC15',
    title: 'Heavy Transport Excellence',
    sub: 'Built for the heaviest loads on the continent',
    body: 'Specialized hauling for oversized, abnormal and industrial cargo across East Africa\'s most demanding corridors — with full cross-border permits.',
    bullets: ['Up to 120 Tonnes capacity', '15+ Low Loaders in fleet', 'Full cross-border documentation'],
  },
  {
    num: '02', visual: 'container', icon: Package, accent: '#60A5FA',
    title: 'Container Haulage Network',
    sub: 'Port-to-door with zero compromise',
    body: 'Reliable, time-critical container movement from Mombasa port to inland destinations across the region, backed by full documentation support.',
    bullets: ['ISO-certified operations', 'Real-time cargo visibility', 'Port clearance specialists'],
  },
  {
    num: '03', visual: 'map', icon: Globe, accent: '#34D399',
    title: 'Cross-Border Expertise',
    sub: '8 countries. One trusted fleet.',
    body: 'Smooth, fully compliant cargo movement across Kenya, Uganda, Tanzania, Rwanda, DRC, South Sudan and Ethiopia — with proven border expertise.',
    bullets: ['All transit documents handled', 'In-country border agents', 'Regional compliance team'],
  },
  {
    num: '04', visual: 'fleet', icon: Gauge, accent: '#F87171',
    title: 'Fleet Capacity That Delivers',
    sub: '140+ assets ready to move',
    body: 'An extensive, rigorously maintained fleet across multiple asset categories ensures we never turn down your shipment, no matter the scale.',
    bullets: ['140+ total fleet units', 'Low loaders, tankers, flatbeds', 'Cranes up to 200T capacity'],
  },
  {
    num: '05', visual: 'safety', icon: Shield, accent: '#A78BFA',
    title: 'Safety & Reliability',
    sub: '98% on-time delivery rate',
    body: 'Experienced, certified drivers, GPS-tracked vehicles, and operational discipline honed over 25 years — delivering on our promise every time.',
    bullets: ['GPS fleet monitoring 24/7', 'Driver training & certification', 'Award-winning safety record'],
  },
];

/* ─── Left-panel visual components ──────────────────────────────────── */
function HeavyPanel() {
  return (
    <div className="absolute inset-0">
      <img src="/images/Transport.jpg" alt="Heavy Transport" className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)' }} />
      <div className="absolute inset-0 flex flex-col justify-end p-10 pb-14">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-300/70">Max Capacity</div>
        <div className="text-[7rem] font-black text-white leading-none mb-4">120T</div>
        <div className="grid grid-cols-2 gap-3">
          {[['15+','Low Loaders'],['120T','Max Payload'],['24/7','Dispatch'],['8','Countries']].map(([v,l])=>(
            <div key={l} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <div className="text-2xl font-black text-white">{v}</div>
              <div className="text-white/50 text-xs mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContainerPanel() {
  return (
    <div className="absolute inset-0">
      <img src="/images/Safe & Smooth Movement.jpg" alt="Container Haulage" className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(15,123,70,0.2) 100%)' }} />
      <div className="absolute inset-0 flex flex-col justify-end p-10 pb-14">
        <span className="badge-v2 bg-blue-500/20 text-blue-300 border border-blue-400/25 mb-5 self-start">
          Port · Inland · Delivery
        </span>
        <div className="text-4xl font-black text-white mb-3 leading-tight">Port-to-Door<br />Precision</div>
        <div className="flex gap-3 flex-wrap">
          {['Mombasa Port','Nairobi ICD','Kampala','Kigali','Dar es Salaam'].map(city=>(
            <span key={city} className="px-3 py-1 bg-blue-500/15 border border-blue-400/20 rounded-full text-blue-200 text-xs font-semibold">{city}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MapPanel() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#020c08] rounded-3xl overflow-hidden p-2">
      <svg viewBox="0 0 600 480" className="w-full h-full">
        <defs>
          <clipPath id="ss-clip"><rect x="0" y="0" width="600" height="480"/></clipPath>
          <radialGradient id="ss-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FACC15" stopOpacity="0.55"/><stop offset="100%" stopColor="#FACC15" stopOpacity="0"/></radialGradient>
          <filter id="ss-blur"><feGaussianBlur stdDeviation="9"/></filter>
        </defs>
        <rect width="600" height="480" fill="#020c08"/>
        <g clipPath="url(#ss-clip)">
          <path d={GEO_MINI.Somalia}    fill="#0c2216" fillOpacity="0.65" stroke="#1c3d28" strokeWidth="0.35"/>
          <path d={GEO_MINI.DRC}        fill="#0F7B46" fillOpacity="0.18" stroke="#2ddf80" strokeWidth="0.7" strokeOpacity="0.80"/>
          <path d={GEO_MINI.SouthSudan} fill="#0F7B46" fillOpacity="0.22" stroke="#2ddf80" strokeWidth="0.8" strokeOpacity="0.80"/>
          <path d={GEO_MINI.Ethiopia}   fill="#0F7B46" fillOpacity="0.25" stroke="#2ddf80" strokeWidth="0.8" strokeOpacity="0.80"/>
          <path d={GEO_MINI.Uganda}     fill="#0F7B46" fillOpacity="0.30" stroke="#22c55e" strokeWidth="0.9" strokeOpacity="0.80"/>
          <path d={GEO_MINI.Rwanda}     fill="#0F7B46" fillOpacity="0.32" stroke="#22c55e" strokeWidth="0.9" strokeOpacity="0.80"/>
          <path d={GEO_MINI.Burundi}    fill="#0F7B46" fillOpacity="0.32" stroke="#22c55e" strokeWidth="0.9" strokeOpacity="0.80"/>
          <path d={GEO_MINI.Tanzania}   fill="#0F7B46" fillOpacity="0.28" stroke="#22c55e" strokeWidth="1.0" strokeOpacity="0.80"/>
          <path d={GEO_MINI.Kenya}      fill="#0F7B46" fillOpacity="0.40" stroke="#34d399" strokeWidth="1.2" strokeOpacity="0.90"/>
          <ellipse cx="241" cy="272" rx="33" ry="37" fill="#0d3a5e" fillOpacity="0.75" stroke="#1d6fa8" strokeWidth="0.7" strokeOpacity="0.60"/>
          <text x="241" y="276" textAnchor="middle" fontSize="6" fontStyle="italic" fill="rgba(130,200,255,0.50)" fontFamily="Inter,sans-serif">L. Victoria</text>
          <text x="370" y="238" textAnchor="middle" fill="rgba(255,255,255,0.70)" fontSize="10"  fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">KENYA</text>
          <text x="286" y="408" textAnchor="middle" fill="rgba(255,255,255,0.62)" fontSize="9.5" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">TANZANIA</text>
          <text x="208" y="216" textAnchor="middle" fill="rgba(255,255,255,0.60)" fontSize="9"   fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">UGANDA</text>
          <text x="394" y="60"  textAnchor="middle" fill="rgba(255,255,255,0.56)" fontSize="9.5" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">ETHIOPIA</text>
          <text x="170" y="87"  textAnchor="middle" fill="rgba(255,255,255,0.52)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">S. SUDAN</text>
          <text x="148" y="290" textAnchor="middle" fill="rgba(255,255,255,0.52)" fontSize="7"   fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">RWANDA</text>
        </g>
        <circle cx="331" cy="280" r="28" fill="url(#ss-glow)" filter="url(#ss-blur)"/>
        <path d="M398,346 Q381,293 331,280" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
        <path d="M376,37 Q370,159 331,280"  fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
        <path d="M331,280 Q280,261 231,242" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
        <path d="M231,242 Q220,189 208,136" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
        <path d="M331,280 Q330,305 328,329" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
        <path d="M328,329 Q358,370 388,410" fill="none" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>
        <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0s"   path="M398,346 Q381,293 331,280"/></circle>
        <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="5s"   repeatCount="indefinite" begin="0s"   path="M376,37 Q370,159 331,280"/></circle>
        <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.8s" repeatCount="indefinite" begin="0.8s" path="M331,280 Q280,261 231,242"/></circle>
        <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0.7s" path="M331,280 Q330,305 328,329"/></circle>
        <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="3.5s" repeatCount="indefinite" begin="1.1s" path="M328,329 Q358,370 388,410"/></circle>
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
  );
}

function FleetPanel() {
  const fleet = [
    { label: 'Low Loaders',    count: '15+' },
    { label: 'Tankers',        count: '25+' },
    { label: 'Flatbeds',       count: '30+' },
    { label: 'Tractor Heads',  count: '35+' },
    { label: 'Cranes',         count: '8+'  },
    { label: 'Cargo Trucks',   count: '27+' },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center p-10"
      style={{ background: 'linear-gradient(160deg, #020D06, #041510)' }}>
      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-v2-green">Total Fleet</div>
      <div className="text-[7.5rem] font-black text-white leading-none mb-1">140+</div>
      <div className="text-white/30 text-sm mb-10">Fleet units across East Africa</div>

      <div className="grid grid-cols-3 gap-3">
        {fleet.map(f=>(
          <div key={f.label} className="bg-white/5 border border-white/8 rounded-2xl p-4 flex flex-col">
            <span className="text-2xl font-black text-v2-yellow mb-1">{f.count}</span>
            <span className="text-white/45 text-xs font-medium">{f.label}</span>
          </div>
        ))}
      </div>

      {/* Utilization bar */}
      <div className="mt-8">
        <div className="flex justify-between text-xs text-white/40 mb-2">
          <span>Fleet Utilization</span><span className="text-v2-yellow font-bold">94%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-v2-yellow rounded-full"
            initial={{width:0}} animate={{width:'94%'}} transition={{delay:0.4,duration:1.5,ease:'easeOut'}}/>
        </div>
      </div>
    </div>
  );
}

function SafetyPanel() {
  const metrics = [
    { label: 'On-Time Delivery', value: '98%',  color: '#34D399' },
    { label: 'GPS Tracking',     value: 'Live',  color: '#60A5FA' },
    { label: 'Driver Score',     value: '4.8★',  color: '#FACC15' },
    { label: 'Fleet Maintained', value: '100%',  color: '#A78BFA' },
    { label: 'Road Safety Award',value: '2010',  color: '#F87171' },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center p-10"
      style={{ background: 'linear-gradient(160deg, #020D06, #041510)' }}>
      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">Reliability Score</div>
      <div className="text-[7rem] font-black leading-none mb-1" style={{ color: '#A78BFA' }}>98%</div>
      <div className="text-white/30 text-sm mb-10">On-time delivery — 25 year average</div>

      <div className="space-y-3">
        {metrics.map((m,i)=>(
          <motion.div key={m.label}
            initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.1+0.3,duration:0.5}}
            className="flex items-center justify-between bg-white/5 border border-white/8 rounded-xl px-5 py-3">
            <span className="text-white/55 text-sm">{m.label}</span>
            <span className="font-bold text-sm" style={{color:m.color}}>{m.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const PANELS = { heavy: HeavyPanel, container: ContainerPanel, map: MapPanel, fleet: FleetPanel, safety: SafetyPanel };

/* ─── Main component ────────────────────────────────────────────────── */
export default function StoryScroll() {
  const [active, setActive] = useState(0);
  const [mobileStep, setMobileStep] = useState(0);
  const stepRefs = useRef([]);
  const headerRef = useRef(null);
  const [headerInView, setHeaderInView] = useState(false);

  /* Observe header */
  useEffect(() => {
    if (!headerRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderInView(true); }, { threshold: 0.3 });
    obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  /* Observe steps for sticky left update */
  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { rootMargin: '-25% 0px -25% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const PanelComponent = PANELS[STEPS[active].visual];
  const MobilePanelComponent = PANELS[STEPS[mobileStep].visual];
  const step = STEPS[active];

  return (
    <section id="story" className="bg-v2-dark">
      {/* Section header */}
      <div ref={headerRef} className="wrap py-20 lg:py-28 text-center border-b border-white/8">
        <motion.div initial={{opacity:0,y:20}} animate={headerInView?{opacity:1,y:0}:{}} transition={{duration:0.7}}>
          <span className="badge-v2 bg-v2-green/15 text-v2-green border border-v2-green/25 mb-5">
            Our Capabilities
          </span>
          <h2 className="heading-xl text-white mb-4">
            Built for Every{' '}
            <span className="text-grad-yellow">Challenge.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Five core capabilities that make Roadtainers the most trusted logistics operator in East Africa.
          </p>
        </motion.div>
      </div>

      {/* ── DESKTOP: Sticky left + scrolling right ── */}
      <div className="hidden lg:block">
        <div className="flex relative">
          {/* LEFT — sticky visual panel */}
          <div className="w-[52%] sticky top-0 h-screen overflow-hidden flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <PanelComponent />
              </motion.div>
            </AnimatePresence>

            {/* Step progress dots (bottom left overlay) */}
            <div className="absolute bottom-10 left-10 flex gap-2 z-20">
              {STEPS.map((s, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-10 bg-v2-yellow' : 'w-3 bg-white/20'}`}
                  aria-label={`Step ${i + 1}`} />
              ))}
            </div>

            {/* Active step label overlay */}
            <div className="absolute top-8 left-8 z-20">
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}}
                  transition={{duration:0.3}}
                  className="flex items-center gap-3">
                  <span className="text-white/30 text-[11px] font-bold uppercase tracking-widest">{STEPS[active].num}</span>
                  <span className="w-8 h-px bg-white/20" />
                  <span className="text-white/30 text-[11px] font-bold uppercase tracking-widest">of 05</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — scrolling step cards */}
          <div className="flex-1 border-l border-white/8">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  ref={el => stepRefs.current[i] = el}
                  className={`min-h-screen flex items-center px-14 py-20 transition-all duration-500 ${
                    i === active ? 'bg-white/[0.02]' : ''
                  }`}
                >
                  <div className="max-w-lg">
                    {/* Step number */}
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-7xl font-black text-white leading-none select-none">{s.num}</span>
                      <div className="flex-1 h-px bg-white/10" />
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                        style={{ backgroundColor: `${s.accent}15` }}>
                        <Icon size={18} style={{ color: s.accent }} />
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: s.accent }}>{s.sub}</p>
                    <h3 className="text-4xl font-black text-white mb-5 leading-tight">{s.title}</h3>
                    <p className="text-white/45 text-base leading-relaxed mb-8">{s.body}</p>

                    {/* Bullets */}
                    <ul className="space-y-3 mb-10">
                      {s.bullets.map(b => (
                        <li key={b} className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${s.accent}20` }}>
                            <Check size={11} style={{ color: s.accent }} />
                          </span>
                          <span className="text-white/60 text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Active indicator bar */}
                    <div className={`h-px transition-all duration-700 ${i === active ? 'w-full' : 'w-0'}`}
                      style={{ background: `linear-gradient(to right, ${s.accent}, transparent)` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE: Tabs + visual + content ── */}
      <div className="lg:hidden">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 px-5 py-4 border-b border-white/8 no-scrollbar">
          {STEPS.map((s, i) => (
            <button key={i} onClick={() => setMobileStep(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                i === mobileStep
                  ? 'text-v2-dark'
                  : 'bg-white/8 text-white/50 hover:bg-white/12 hover:text-white'
              }`}
              style={i === mobileStep ? { backgroundColor: STEPS[mobileStep].accent } : {}}>
              {s.num}
            </button>
          ))}
        </div>

        {/* Visual thumbnail */}
        <div className="relative h-72 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={mobileStep} className="absolute inset-0"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}}>
              <MobilePanelComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div key={mobileStep}
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.4}}
            className="p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
              style={{ color: STEPS[mobileStep].accent }}>
              {STEPS[mobileStep].sub}
            </p>
            <h3 className="text-2xl font-black text-white mb-4">{STEPS[mobileStep].title}</h3>
            <p className="text-white/45 text-sm leading-relaxed mb-6">{STEPS[mobileStep].body}</p>
            <ul className="space-y-2.5">
              {STEPS[mobileStep].bullets.map(b => (
                <li key={b} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${STEPS[mobileStep].accent}20` }}>
                    <Check size={11} style={{ color: STEPS[mobileStep].accent }} />
                  </span>
                  <span className="text-white/55 text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA strip */}
      <div className="border-t border-white/8 py-10">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm">Ready to move your cargo?</p>
          <a href={SITE} target="_blank" rel="noopener noreferrer"
            className="btn-yellow">
            Request a Quote <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
