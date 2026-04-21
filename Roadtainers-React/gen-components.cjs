const fs = require("fs");
const geo = JSON.parse(fs.readFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React/geo-output.json","utf8"));
const G = {};
geo.forEach(c => { G[c.name] = { dBig: c.dBig, dMini: c.dMini }; });

/* City positions: center=[35.5,0] scale=1350
   Big: translate=[350,260] ViewBox 0 0 700 500
   Mini: translate=[300,250] ViewBox 0 0 600 480 */
const BIG_CITIES = [
  {id:"addis",name:"Addis Ababa",country:"Ethiopia",px:426,py:47,hub:true},
  {id:"juba",name:"Juba",country:"S. Sudan",px:258,py:146,hub:true},
  {id:"kampala",name:"Kampala",country:"Uganda",px:281,py:252,hub:true},
  {id:"kigali",name:"Kigali",country:"Rwanda",px:222,py:306,hub:false},
  {id:"bujumbura",name:"Bujumbura",country:"Burundi",px:205,py:340,hub:false},
  {id:"eldoret",name:"Eldoret",country:"Kenya",px:345,py:248,hub:false},
  {id:"kisumu",name:"Kisumu",country:"Kenya",px:333,py:262,hub:false},
  {id:"nairobi",name:"Nairobi",country:"Kenya",px:381,py:290,hub:true},
  {id:"mombasa",name:"Mombasa",country:"Kenya",px:448,py:356,hub:true},
  {id:"mwanza",name:"Mwanza",country:"Tanzania",px:289,py:319,hub:false},
  {id:"arusha",name:"Arusha",country:"Tanzania",px:378,py:339,hub:false},
  {id:"dar",name:"Dar es Salaam",country:"Tanzania",px:438,py:420,hub:true},
];
const MINI_CITIES = [
  {id:"addis",name:"Addis",country:"Ethiopia",px:376,py:37,hub:true},
  {id:"juba",name:"Juba",country:"S. Sudan",px:208,py:136,hub:true},
  {id:"kampala",name:"Kampala",country:"Uganda",px:231,py:242,hub:true},
  {id:"kigali",name:"Kigali",country:"Rwanda",px:172,py:296,hub:false},
  {id:"nairobi",name:"Nairobi",country:"Kenya",px:331,py:280,hub:true},
  {id:"mombasa",name:"Mombasa",country:"Kenya",px:398,py:346,hub:true},
  {id:"arusha",name:"Arusha",country:"Tanzania",px:328,py:329,hub:false},
  {id:"dar",name:"Dar",country:"Tanzania",px:388,py:410,hub:true},
];
const BIG_ROUTES = [
  {from:"mombasa",to:"nairobi",dur:"3.5s",begin:"0s"},
  {from:"nairobi",to:"eldoret",dur:"3.2s",begin:"0.6s"},
  {from:"eldoret",to:"kampala",dur:"4s",begin:"1s"},
  {from:"nairobi",to:"kisumu",dur:"3s",begin:"0.4s"},
  {from:"kisumu",to:"kampala",dur:"3.2s",begin:"1.2s"},
  {from:"kampala",to:"juba",dur:"4.5s",begin:"0.2s"},
  {from:"kampala",to:"kigali",dur:"3.8s",begin:"0.8s"},
  {from:"kigali",to:"bujumbura",dur:"2.5s",begin:"1.4s"},
  {from:"kampala",to:"mwanza",dur:"3.5s",begin:"0.3s"},
  {from:"mwanza",to:"dar",dur:"4.2s",begin:"1.8s"},
  {from:"nairobi",to:"arusha",dur:"3s",begin:"0.7s"},
  {from:"arusha",to:"dar",dur:"3.5s",begin:"1.1s"},
  {from:"addis",to:"nairobi",dur:"5s",begin:"0s"},
  {from:"addis",to:"juba",dur:"4.8s",begin:"0.5s"},
  {from:"mombasa",to:"dar",dur:"4s",begin:"1.3s"},
];
const MINI_ROUTES = [
  {from:"mombasa",to:"nairobi",dur:"3.5s",begin:"0s"},
  {from:"nairobi",to:"kampala",dur:"3.8s",begin:"0.6s"},
  {from:"kampala",to:"juba",dur:"4.5s",begin:"0.2s"},
  {from:"nairobi",to:"arusha",dur:"3s",begin:"0.7s"},
  {from:"arusha",to:"dar",dur:"3.5s",begin:"1.1s"},
  {from:"addis",to:"nairobi",dur:"5s",begin:"0s"},
  {from:"kampala",to:"kigali",dur:"3.8s",begin:"0.8s"},
];

function curvePath(cities, fid, tid) {
  const cm = Object.fromEntries(cities.map(c => [c.id,c]));
  const f=cm[fid], t=cm[tid];
  if(!f||!t) return "";
  const mx=(f.px+t.px)/2-(t.py-f.py)*0.18;
  const my=(f.py+t.py)/2+(t.px-f.px)*0.18;
  return "M"+f.px+","+f.py+" Q"+Math.round(mx)+","+Math.round(my)+" "+t.px+","+t.py;
}

const BIG_LABELS = [
  {text:"KENYA",    x:420,y:248,size:10.5,op:0.72},
  {text:"TANZANIA", x:336,y:418,size:10,  op:0.65},
  {text:"UGANDA",   x:258,y:226,size:9.5, op:0.62},
  {text:"ETHIOPIA", x:444,y:68, size:10,  op:0.58},
  {text:"S. SUDAN", x:218,y:97, size:9,   op:0.55},
  {text:"RWANDA",   x:198,y:300,size:7.5, op:0.55},
  {text:"BURUNDI",  x:188,y:340,size:7.5, op:0.52},
  {text:"DRC",      x:108,y:395,size:9,   op:0.42},
  {text:"SOMALIA",  x:588,y:157,size:9,   op:0.26},
];
const MINI_LABELS = [
  {text:"KENYA",    x:370,y:238,size:10,  op:0.70},
  {text:"TANZANIA", x:286,y:408,size:9.5, op:0.62},
  {text:"UGANDA",   x:208,y:216,size:9,   op:0.60},
  {text:"ETHIOPIA", x:394,y:60, size:9.5, op:0.56},
  {text:"S. SUDAN", x:170,y:87, size:8.5, op:0.52},
  {text:"RWANDA",   x:148,y:290,size:7,   op:0.52},
];

// Build the inline data strings
function pathsLine(cities, routes) {
  return routes.map(r => {
    const d = curvePath(cities, r.from, r.to);
    return JSON.stringify({...r, d});
  });
}

const bigRoutes = BIG_ROUTES.map(r => ({...r, d: curvePath(BIG_CITIES, r.from, r.to)}));
const miniRoutes = MINI_ROUTES.map(r => ({...r, d: curvePath(MINI_CITIES, r.from, r.to)}));

// ═══════════════════════════════════════════════════════
// Build the big map SVG JSX string (shared between V1 and V2)
// ═══════════════════════════════════════════════════════
function bigMapSVG(clipId, gridId, glowId, blurId, colTip) {
  const ctxKeys = ["Somalia","Zambia","Malawi","Mozambique","Sudan","CAR","Eritrea","Djibouti"];
  const ctxPaths = ctxKeys.filter(k=>G[k]).map(k =>
    `                    <path key="${k}" d={"${G[k].dBig}"} fill="#0c2216" fillOpacity="0.68" stroke="#1c3d28" strokeWidth="0.4" strokeOpacity="0.45" />`
  ).join("\n");

  const opEntries = [
    {k:"DRC",       fo:0.20, so:0.50, sw:0.7, sc:"#2ddf80"},
    {k:"SouthSudan",fo:0.24, so:0.55, sw:0.8, sc:"#2ddf80"},
    {k:"Ethiopia",  fo:0.26, so:0.58, sw:0.8, sc:"#2ddf80"},
    {k:"Uganda",    fo:0.30, so:0.65, sw:0.9, sc:"#22c55e"},
    {k:"Rwanda",    fo:0.34, so:0.70, sw:0.9, sc:"#22c55e"},
    {k:"Burundi",   fo:0.34, so:0.70, sw:0.9, sc:"#22c55e"},
    {k:"Tanzania",  fo:0.30, so:0.68, sw:1.0, sc:"#22c55e"},
    {k:"Kenya",     fo:0.40, so:0.90, sw:1.3, sc:"#34d399"},
  ];
  const opPaths = opEntries.map(e =>
    `                    <path d={"${G[e.k].dBig}"} fill="#0F7B46" fillOpacity="${e.fo}" stroke="${e.sc}" strokeWidth="${e.sw}" strokeOpacity="${e.so}" />`
  ).join("\n");

  const labelLines = BIG_LABELS.map(l =>
    `                    <text x={${l.x}} y={${l.y}} textAnchor="middle" fill={"rgba(255,255,255,${l.op})"} fontSize={${l.size}} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">${l.text}</text>`
  ).join("\n");

  const routeLines = bigRoutes.map((r,i) =>
    `                  <motion.path key="${r.from+r.to}" d={"${r.d}"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:${(0.4+i*0.08).toFixed(2)},ease:"easeOut"}} />`
  ).join("\n");

  const dotLines = bigRoutes.map(r =>
    `                  <circle key={"dot-${r.from}${r.to}"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="${r.dur}" repeatCount="indefinite" begin="${r.begin}" path={"${r.d}"} /></circle>`
  ).join("\n");

  const cityLines = BIG_CITIES.map(c => `                  <g key="${c.id}" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip(${JSON.stringify(c)})} onMouseLeave={()=>setTooltip(null)}>
                    ${c.hub ? `<circle cx={${c.px}} cy={${c.py}} r="16" fill="none" stroke="#FACC15" strokeWidth="1.5" opacity="0"><animate attributeName="r" values="12;26;12" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/></circle><circle cx={${c.px}} cy={${c.py}} r="10" fill="none" stroke="#FACC15" strokeWidth="1" opacity="0.3"><animate attributeName="r" values="8;18;8" dur="3s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin="0.5s" repeatCount="indefinite"/></circle>` : `<circle cx={${c.px}} cy={${c.py}} r="8" fill="none" stroke="#0F7B46" strokeWidth="0.8" opacity="0.22"><animate attributeName="r" values="5;11;5" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.25;0;0.25" dur="3.5s" repeatCount="indefinite"/></circle>`}
                    <circle cx={${c.px}} cy={${c.py}} r={${c.hub?7:4.5}} fill="${c.hub?"#FACC15":"#2ddf80"}" stroke="${c.hub?"#ffffff":"#FACC15"}" strokeWidth="${c.hub?2.5:1.5}" />
                    <text x={${c.px+(c.hub?11:8)}} y={${c.py+4}} fill="${c.hub?"rgba(255,255,255,0.96)":"rgba(255,255,255,0.68)"}" fontSize="${c.hub?10.5:8.5}" fontWeight="${c.hub?700:500}" fontFamily="Inter,sans-serif">${c.name}</text>
                  </g>`).join("\n");

  return `
              <div className="relative" style={{paddingBottom:"71.4%"}}>
                <svg viewBox="0 0 700 500" className="absolute inset-0 w-full h-full">
                  <defs>
                    <clipPath id="${clipId}"><rect x="0" y="0" width="700" height="500"/></clipPath>
                    <pattern id="${gridId}" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0L0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/></pattern>
                    <radialGradient id="${glowId}" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FACC15" stopOpacity="0.45"/><stop offset="100%" stopColor="#FACC15" stopOpacity="0"/></radialGradient>
                    <filter id="${blurId}"><feGaussianBlur stdDeviation="10"/></filter>
                  </defs>
                  <rect width="700" height="500" fill="#020c08"/>
                  <rect width="700" height="500" fill={"url(#${gridId})"} opacity="0.035"/>
                  <text x="640" y="290" textAnchor="middle" fontSize="8" fill="rgba(100,180,255,0.15)" fontFamily="Inter,sans-serif" fontStyle="italic">Indian Ocean</text>
                  <g clipPath={"url(#${clipId})"}>
${ctxPaths}
${opPaths}
                    <ellipse cx="291" cy="282" rx="36" ry="40" fill="#0d3a5e" fillOpacity="0.75" stroke="#1d6fa8" strokeWidth="0.8" strokeOpacity="0.65"/>
                    <text x="291" y="286" textAnchor="middle" fontSize="6.5" fontStyle="italic" fill="rgba(130,200,255,0.55)" fontFamily="Inter,sans-serif">L. Victoria</text>
${labelLines}
                  </g>
                  <circle cx="381" cy="290" r="35" fill={"url(#${glowId})"} filter={"url(#${blurId})"}/>
${routeLines}
${dotLines}
${cityLines}
                </svg>
                {tooltip && (
                  <div className="absolute pointer-events-none bg-white rounded-xl shadow-xl px-4 py-3 text-sm border border-gray-100 z-20 whitespace-nowrap"
                    style={{left:(tooltip.px/700*100)+"%",top:(tooltip.py/500*100)+"%",transform:"translate(-50%,-130%)"}}>
                    <div className="font-bold ${colTip}">{tooltip.name}</div>
                    <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5"><MapPin size={10}/> {tooltip.country}</div>
                    {tooltip.hub&&<div className="text-green-600 text-xs font-semibold mt-0.5 flex items-center gap-1"><CheckCircle size={10}/>Active Hub</div>}
                  </div>
                )}
              </div>`;
}

function miniMapSVG(clipId, gridId, glowId, blurId) {
  const ctxPaths = ["Somalia"].filter(k=>G[k]).map(k=>
    `          <path d={"${G[k].dMini}"} fill="#0c2216" fillOpacity="0.65" stroke="#1c3d28" strokeWidth="0.35"/>`
  ).join("\n");

  const opPaths = [
    {k:"DRC",       fo:0.18, sw:0.7,  sc:"#2ddf80"},
    {k:"SouthSudan",fo:0.22, sw:0.8,  sc:"#2ddf80"},
    {k:"Ethiopia",  fo:0.25, sw:0.8,  sc:"#2ddf80"},
    {k:"Uganda",    fo:0.30, sw:0.9,  sc:"#22c55e"},
    {k:"Rwanda",    fo:0.32, sw:0.9,  sc:"#22c55e"},
    {k:"Burundi",   fo:0.32, sw:0.9,  sc:"#22c55e"},
    {k:"Tanzania",  fo:0.28, sw:1.0,  sc:"#22c55e"},
    {k:"Kenya",     fo:0.40, sw:1.2,  sc:"#34d399"},
  ].map(e=>
    `          <path d={"${G[e.k].dMini}"} fill="#0F7B46" fillOpacity="${e.fo}" stroke="${e.sc}" strokeWidth="${e.sw}" strokeOpacity="0.80"/>`
  ).join("\n");

  const labelLines = MINI_LABELS.map(l=>
    `          <text x={${l.x}} y={${l.y}} textAnchor="middle" fill={"rgba(255,255,255,${l.op})"} fontSize={${l.size}} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.10em">${l.text}</text>`
  ).join("\n");

  const routeLines = miniRoutes.map(r=>
    `          <line x1="${r.d.split(" ")[0].replace("M","").split(",")[0]}" y1="${r.d.split(" ")[0].replace("M","").split(",")[1]}" x2="${r.d.split(" ")[2].split(",")[0]}" y2="${r.d.split(" ")[2].split(",")[1]}" stroke="#0F7B46" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.70"/>`
  ).join("\n");

  const dotLines = miniRoutes.map(r=>
    `          <circle r="3" fill="#FACC15" opacity="0.92"><animateMotion dur="${r.dur}" repeatCount="indefinite" begin="${r.begin}" path={"${r.d}"/></circle>`
  ).join("\n");

  const cityLines = MINI_CITIES.map(c=>`          <g key="${c.id}">
            ${c.hub ? `<circle cx={${c.px}} cy={${c.py}} r="14" fill="none" stroke="#FACC15" strokeWidth="1.2" opacity="0"><animate attributeName="r" values="10;22;10" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite"/></circle>` : `<circle cx={${c.px}} cy={${c.py}} r="7" fill="none" stroke="#0F7B46" strokeWidth="0.7" opacity="0.2"><animate attributeName="r" values="4;9;4" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.2;0;0.2" dur="3.5s" repeatCount="indefinite"/></circle>`}
            <circle cx={${c.px}} cy={${c.py}} r={${c.hub?6:4}} fill="${c.hub?"#FACC15":"#2ddf80"}" stroke="${c.hub?"#ffffff":"#FACC15"}" strokeWidth="${c.hub?2:1.5}"/>
            <text x={${c.px+(c.hub?10:7)}} y={${c.py+4}} fill="${c.hub?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.65)"}" fontSize="${c.hub?9.5:8}" fontWeight="${c.hub?700:500}" fontFamily="Inter,sans-serif">${c.name}</text>
          </g>`).join("\n");

  return `        <svg viewBox="0 0 600 480" className="w-full h-auto">
          <defs>
            <clipPath id="${clipId}"><rect x="0" y="0" width="600" height="480"/></clipPath>
            <radialGradient id="${glowId}" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FACC15" stopOpacity="0.50"/><stop offset="100%" stopColor="#FACC15" stopOpacity="0"/></radialGradient>
            <filter id="${blurId}"><feGaussianBlur stdDeviation="8"/></filter>
          </defs>
          <rect width="600" height="480" fill="#020c08"/>
          <g clipPath={"url(#${clipId})"}>
${ctxPaths}
${opPaths}
            <ellipse cx="241" cy="272" rx="33" ry="37" fill="#0d3a5e" fillOpacity="0.75" stroke="#1d6fa8" strokeWidth="0.7" strokeOpacity="0.60"/>
            <text x="241" y="276" textAnchor="middle" fontSize="6" fontStyle="italic" fill="rgba(130,200,255,0.50)" fontFamily="Inter,sans-serif">L. Victoria</text>
${labelLines}
          </g>
          <circle cx="331" cy="280" r="28" fill={"url(#${glowId})"} filter={"url(#${blurId})"}/>
${routeLines}
${dotLines}
${cityLines}
        </svg>`;
}

// ══════════════════════════════════
// V1 NetworkMap
// ══════════════════════════════════
const v1NM = `import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GEO_BIG } from '../geoData.js';
import { MapPin, Truck, Phone, ArrowRight, Zap, CheckCircle } from 'lucide-react';

export default function NetworkMap() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [tooltip, setTooltip] = useState(null);

  return (
    <section id="network" className="section-pad bg-brand-light overflow-hidden">
      <div className="container-xl">
        <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7}}
          className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge bg-green-100 text-brand-green mb-4"><MapPin size={12}/>Regional Coverage</span>
          <h2 className="heading-lg text-brand-dark mb-4">Connected Across <span className="text-gradient-green">East Africa</span></h2>
          <p className="text-brand-gray text-lg leading-relaxed">From Mombasa port to Addis Ababa, our network powers reliable cargo movement across 8 countries and 14+ key trade hubs.</p>
        </motion.div>
        <div ref={ref} className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          <motion.div initial={{opacity:0,x:-40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.9,ease:[0.16,1,0.3,1]}} className="lg:col-span-3 relative">
            <div className="relative bg-[#020c08] rounded-3xl p-5 shadow-2xl border border-brand-green/25 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{background:"radial-gradient(ellipse 80% 70% at 58% 55%, transparent 45%, rgba(0,0,0,0.55) 100%)"}}/>
${bigMapSVG("ea-v1-clip","ea-v1-grid","ea-v1-glow","ea-v1-blur","text-brand-dark")}
              <div className="flex items-center gap-6 mt-4 px-2">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-brand-yellow border-2 border-white"/><span className="text-white/50 text-xs">Major Hub</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#2ddf80] border border-brand-yellow/50"/><span className="text-white/50 text-xs">Service Point</span></div>
                <div className="flex items-center gap-2"><div className="w-8 h-0.5" style={{backgroundImage:"repeating-linear-gradient(90deg,#0F7B46 0,#0F7B46 5px,transparent 5px,transparent 9px)"}}/><span className="text-white/50 text-xs">Active Route</span></div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.9,delay:0.2,ease:[0.16,1,0.3,1]}} className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <span className="badge bg-green-100 text-brand-green mb-3"><Zap size={12} fill="currentColor"/>8 Countries · 14+ Hubs</span>
              <h3 className="heading-md text-brand-dark mb-4">Your Cargo, Our Routes. <span className="text-gradient-green">Every Corridor.</span></h3>
              <p className="text-brand-gray leading-relaxed">From Mombasa to Goma, Nairobi to Addis Ababa — our logistics network spans East Africa's most critical trade corridors with 24/7 fleet visibility.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[{icon:Truck,value:"140+",label:"Fleet Units"},{icon:MapPin,value:"10k+",label:"Deliveries Completed"},{icon:CheckCircle,value:"24/7",label:"Operations Support"}].map((s,i)=>(
                <div key={i} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-card">
                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0"><s.icon size={20} className="text-brand-green"/></div>
                  <div><div className="font-extrabold text-brand-dark text-xl">{s.value}</div><div className="text-brand-gray text-sm">{s.label}</div></div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="#contact" className="btn-primary text-sm flex items-center justify-center gap-2">Request Quote <ArrowRight size={15}/></a>
              <a href="tel:+254000000000" className="btn-outline-green text-sm justify-center"><Phone size={15}/> Call Our Team</a>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <p className="text-xs text-brand-gray font-semibold uppercase tracking-wider mb-3">Countries Served</p>
              <div className="flex flex-wrap gap-2">
                {["Kenya","Uganda","Tanzania","Rwanda","Burundi","DRC","South Sudan","Ethiopia"].map(c=>(
                  <span key={c} className="bg-green-50 text-brand-green text-xs font-semibold px-3 py-1 rounded-full border border-green-100">{c}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}`;

fs.writeFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React/src/components/NetworkMap.jsx", v1NM, "utf8");
console.log("V1 NetworkMap written: " + v1NM.length + " bytes");

// ══════════════════════════════════
// V2 NetworkMap
// ══════════════════════════════════
const v2NM = `import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { GEO_BIG } from '../geoData.js';
import { MapPin, CheckCircle, Truck, Zap } from 'lucide-react';

function Counter({ to, suffix = '', inView }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const steps = 60; const inc = to / steps; let cur = 0;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(cur));
    }, 28);
    return () => clearInterval(id);
  }, [to, inView]);
  return <>{val}{suffix}</>;
}

export default function NetworkMap() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [tooltip, setTooltip] = useState(null);

  return (
    <section id="network" className="sec bg-white">
      <div className="wrap">
        <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7}}
          className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-v2 bg-v2-green/10 text-v2-green border border-v2-green/20 mb-5"><MapPin size={12}/>Regional Coverage</span>
          <h2 className="heading-xl text-v2-text mb-4">Connected Across <span className="text-grad-green">East Africa</span></h2>
          <p className="text-v2-gray text-lg leading-relaxed">From Mombasa port to Addis Ababa — our network powers reliable cargo movement across 8 countries and 14+ trade hubs.</p>
        </motion.div>
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.2}}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[{to:8,suffix:"",label:"Countries"},{to:14,suffix:"+",label:"Trade Hubs"},{to:140,suffix:"+",label:"Fleet Units"},{to:25,suffix:"+",label:"Years Active"}].map((s,i)=>(
            <div key={i} className="rounded-2xl border border-gray-100 bg-v2-light p-5 text-center">
              <div className="text-3xl font-black text-v2-green mb-1"><Counter to={s.to} suffix={s.suffix} inView={inView}/></div>
              <div className="text-v2-gray text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.9,ease:[0.16,1,0.3,1]}} className="lg:col-span-3">
            <div className="relative rounded-3xl overflow-hidden bg-[#020c08] border border-v2-green/20 shadow-2xl p-5">
              <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{background:"radial-gradient(ellipse 80% 70% at 58% 55%, transparent 45%, rgba(0,0,0,0.55) 100%)"}}/>
${bigMapSVG("ea-v2-clip","ea-v2-grid","ea-v2-glow","ea-v2-blur","text-v2-text")}
              <div className="flex items-center gap-6 mt-4 px-2">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-v2-yellow border-2 border-white/30"/><span className="text-white/40 text-xs">Major Hub</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#2ddf80] border border-white/20"/><span className="text-white/40 text-xs">Service Point</span></div>
                <div className="flex items-center gap-2"><div className="w-6 h-px bg-v2-green opacity-60" style={{backgroundImage:"repeating-linear-gradient(90deg,#0F7B46 0,#0F7B46 4px,transparent 4px,transparent 8px)"}}/><span className="text-white/40 text-xs">Active Route</span></div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.9,delay:0.2,ease:[0.16,1,0.3,1]}} className="lg:col-span-2 flex flex-col gap-5">
            <div>
              <h3 className="text-2xl font-black text-v2-text mb-3">Your Cargo, <span className="text-grad-green">Every Corridor.</span></h3>
              <p className="text-v2-gray leading-relaxed text-sm">From Mombasa to Goma, Nairobi to Addis Ababa — our logistics network spans East Africa's most critical trade corridors with 24/7 fleet visibility.</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[{icon:Truck,text:"140+ fleet units across 8 countries"},{icon:MapPin,text:"14+ key trade hubs and border points"},{icon:Zap,text:"24/7 GPS tracking and ops support"},{icon:CheckCircle,text:"25+ years of cross-border expertise"}].map((item,i)=>(
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-v2-light border border-gray-100 hover:border-v2-green/30 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-v2-green/10 flex items-center justify-center flex-shrink-0"><item.icon size={16} className="text-v2-green"/></div>
                  <span className="text-v2-text text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-v2-gray text-xs font-semibold uppercase tracking-widest mb-3">Countries Served</p>
              <div className="flex flex-wrap gap-2">
                {["Kenya","Uganda","Tanzania","Rwanda","Ethiopia","S. Sudan","Burundi","DRC"].map(c=>(
                  <span key={c} className="px-3 py-1.5 rounded-full bg-v2-green/8 border border-v2-green/20 text-v2-green text-xs font-semibold">{c}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}`;

fs.writeFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React-V2/src/components/NetworkMap.jsx", v2NM, "utf8");
console.log("V2 NetworkMap written: " + v2NM.length + " bytes");
