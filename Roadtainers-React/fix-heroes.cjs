const fs = require("fs");

function heroMiniSVG(clipId, glowId, blurId) {
  return `              {/* Real East Africa map \u2014 Natural Earth + d3-geo projection */}
              <div className="relative rounded-2xl overflow-hidden mb-4 border border-white/5"
                   style={{ background: 'linear-gradient(160deg,#020c08,#041510)' }}>
                <svg viewBox="0 0 600 480" className="w-full h-auto">
                  <defs>
                    <clipPath id="${clipId}"><rect x="0" y="0" width="600" height="480"/></clipPath>
                    <radialGradient id="${glowId}" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FACC15" stopOpacity="0.55"/>
                      <stop offset="100%" stopColor="#FACC15" stopOpacity="0"/>
                    </radialGradient>
                    <filter id="${blurId}"><feGaussianBlur stdDeviation="8"/></filter>
                  </defs>
                  <rect width="600" height="480" fill="#020c08"/>
                  <g clipPath={"url(#${clipId})"}>
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
                  <circle cx="331" cy="280" r="28" fill={"url(#${glowId})"} filter={"url(#${blurId})"}/>
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
              </div>`;
}

// ??? V1 Hero ???????????????????????????????????????????????????????
let v1 = fs.readFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React/src/components/Hero.jsx","utf8")
           .replace(/\r\n/g,"\n");

if (!v1.includes("GEO_MINI")) {
  v1 = v1.replace("import { motion } from 'framer-motion';",
                  "import { motion } from 'framer-motion';\nimport { GEO_MINI } from '../geoData.js';");
}

// Find SVG section by locating the comment and the wrapping div
const markerStart = "{/* Africa map SVG";
const markerEnd   = "{/* Stats row */}";
const si = v1.indexOf(markerStart);
const ei = v1.indexOf(markerEnd);
if (si === -1 || ei === -1) { console.error("V1 markers not found! si="+si+" ei="+ei); process.exit(1); }
v1 = v1.slice(0, si) + heroMiniSVG("hero-v1-clip","hero-v1-glow","hero-v1-blur") + "\n\n              " + v1.slice(ei);
fs.writeFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React/src/components/Hero.jsx", v1, "utf8");
console.log("V1 Hero patched: " + v1.length);

// ??? V2 Hero ???????????????????????????????????????????????????????
let v2 = fs.readFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React-V2/src/components/Hero.jsx","utf8")
           .replace(/\r\n/g,"\n");

if (!v2.includes("GEO_MINI")) {
  v2 = v2.replace("import { useEffect, useRef, useState } from 'react';",
                  "import { useEffect, useRef, useState } from 'react';\nimport { GEO_MINI } from '../geoData.js';");
}

// Find the mini map section in V2 Hero using the SVG viewBox marker
const v2svgOld = 'viewBox="235 175 270 295"';
const v2svgIdx = v2.indexOf(v2svgOld);
if (v2svgIdx === -1) { console.log("V2 Hero: old viewBox not found - may already be patched"); }
else {
  // Go back to find the opening <div of this map section
  const beforeSvg = v2.slice(0, v2svgIdx);
  const divOpenIdx = beforeSvg.lastIndexOf("<div ");
  // Balance braces for the closing tag
  let depth=0, i=divOpenIdx;
  while (i < v2.length) {
    if (v2.slice(i,i+4) === "<div") depth++;
    if (v2.slice(i,i+6) === "</div>") { depth--; if (depth===0) break; }
    i++;
  }
  v2 = v2.slice(0, divOpenIdx) + heroMiniSVG("hero-v2-clip","hero-v2-glow","hero-v2-blur").trimStart() + v2.slice(i+6);
  fs.writeFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React-V2/src/components/Hero.jsx", v2, "utf8");
  console.log("V2 Hero patched: " + v2.length);
}

console.log("Done");
