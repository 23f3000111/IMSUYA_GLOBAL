const fs = require("fs");

// ??? Mini map SVG replacement (shared between V1 Hero, V2 Hero, V2 StoryScroll) ???
// All pixel positions: Mercator center=[35.5,0] scale=1350 translate=[300,250] ViewBox=0 0 600 480
// Mini = Big - [50, 10]

function heroMiniSVG(clipId, glowId, blurId) {
  return `              {/* Real East Africa map ? Natural Earth + d3-geo projection */}
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
                  <g clipPath={\`url(#${clipId})\`}>
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
                  <circle cx="331" cy="280" r="28" fill={\`url(#${glowId})\`} filter={\`url(#${blurId})\`}/>
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
              </div>`;
}

// ??? V1 Hero.jsx ?????????????????????????????????????????????????????
let v1Hero = fs.readFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React/src/components/Hero.jsx","utf8");

// Add GEO_MINI import if not present
if (!v1Hero.includes("GEO_MINI")) {
  v1Hero = v1Hero.replace(
    "import { motion } from 'framer-motion';",
    "import { motion } from 'framer-motion';\nimport { GEO_MINI } from '../geoData.js';"
  );
}

// Replace old mini map SVG section
const oldV1MapStart = "              {/* Africa map SVG \u2014 real recognizable continent outline */}";
const oldV1MapEnd   = "              </div>\n\n              {/* Stats row */}";
const newV1Map = heroMiniSVG("hero-v1-clip","hero-v1-glow","hero-v1-blur") + "\n\n              {/* Stats row */}";

if (v1Hero.includes(oldV1MapStart)) {
  const startIdx = v1Hero.indexOf(oldV1MapStart);
  const endIdx   = v1Hero.indexOf(oldV1MapEnd) + oldV1MapEnd.length;
  v1Hero = v1Hero.slice(0, startIdx) + newV1Map + v1Hero.slice(endIdx);
  fs.writeFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React/src/components/Hero.jsx", v1Hero, "utf8");
  console.log("V1 Hero.jsx patched: " + v1Hero.length + " bytes");
} else {
  console.error("V1 Hero: old map section NOT FOUND");
}

// ??? V2 Hero.jsx ?????????????????????????????????????????????????????
let v2Hero = fs.readFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React-V2/src/components/Hero.jsx","utf8");

// Add GEO_MINI import if not present
if (!v2Hero.includes("GEO_MINI")) {
  v2Hero = v2Hero.replace(
    "import { useEffect, useRef, useState } from 'react';",
    "import { useEffect, useRef, useState } from 'react';\nimport { GEO_MINI } from '../geoData.js';"
  );
}

// Find and replace V2 Hero mini map section
// The V2 mini map section has a comment like {/* Mini East Africa SVG map */}
const v2MapComment = "{/* Mini East Africa SVG map */}";
if (v2Hero.includes(v2MapComment)) {
  // Find the surrounding <div> that contains the SVG
  const cmtIdx   = v2Hero.indexOf(v2MapComment);
  // Find the <div> that contains it - go backwards from comment to find the opening div
  const beforeCmt = v2Hero.slice(0, cmtIdx);
  const divOpenIdx = beforeCmt.lastIndexOf("<div ");
  // Find the matching closing </div> for that div
  let depth = 0;
  let i = divOpenIdx;
  while (i < v2Hero.length) {
    if (v2Hero.slice(i).startsWith("<div")) depth++;
    if (v2Hero.slice(i).startsWith("</div>")) { depth--; if (depth === 0) break; }
    i++;
  }
  const divCloseIdx = i + "</div>".length;
  const oldBlock = v2Hero.slice(divOpenIdx, divCloseIdx);
  // The new block wraps with the outer div that has the dark background
  const newV2MapBlock = heroMiniSVG("hero-v2-clip","hero-v2-glow","hero-v2-blur");
  // Extract just the inner div (the one with rounded-2xl) from newV2MapBlock
  const innerDiv = newV2MapBlock.trimStart();
  v2Hero = v2Hero.slice(0, divOpenIdx) + innerDiv + v2Hero.slice(divCloseIdx);
  fs.writeFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React-V2/src/components/Hero.jsx", v2Hero, "utf8");
  console.log("V2 Hero.jsx patched: " + v2Hero.length + " bytes");
} else {
  // Try to find the SVG viewBox instead
  const svgTag = 'viewBox="235 175 270 295"';
  if (v2Hero.includes(svgTag)) {
    // Find the div wrapping it
    const svgIdx = v2Hero.indexOf(svgTag);
    const beforeSvg = v2Hero.slice(0, svgIdx);
    const outerDivIdx = beforeSvg.lastIndexOf("<div ");
    let depth = 0;
    let i = outerDivIdx;
    while (i < v2Hero.length) {
      if (v2Hero.slice(i,i+4) === "<div") depth++;
      if (v2Hero.slice(i,i+6) === "</div>") { depth--; if (depth === 0) break; }
      i++;
    }
    const closeIdx = i + 6;
    const newV2MapBlock = heroMiniSVG("hero-v2-clip","hero-v2-glow","hero-v2-blur").trimStart();
    v2Hero = v2Hero.slice(0, outerDivIdx) + newV2MapBlock + v2Hero.slice(closeIdx);
    fs.writeFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React-V2/src/components/Hero.jsx", v2Hero, "utf8");
    console.log("V2 Hero.jsx patched via viewBox fallback: " + v2Hero.length + " bytes");
  } else {
    console.error("V2 Hero: map section NOT FOUND");
  }
}

// ??? V2 StoryScroll.jsx MapPanel ?????????????????????????????????????
let ss = fs.readFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React-V2/src/components/StoryScroll.jsx","utf8");

if (!ss.includes("GEO_MINI")) {
  ss = ss.replace(
    "import { useState, useEffect, useRef, useCallback } from 'react';",
    "import { useState, useEffect, useRef, useCallback } from 'react';\nimport { GEO_MINI } from '../geoData.js';"
  );
}

const newMapPanel = `function MapPanel() {
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
}`;

// Replace the old MapPanel function
const mapPanelStart = "function MapPanel()";
if (ss.includes(mapPanelStart)) {
  // Find function boundaries by counting braces
  const startIdx = ss.indexOf(mapPanelStart);
  let depth = 0, i = startIdx, foundFirst = false;
  while (i < ss.length) {
    if (ss[i] === '{') { depth++; foundFirst = true; }
    if (ss[i] === '}') { depth--; if (foundFirst && depth === 0) break; }
    i++;
  }
  const endIdx = i + 1;
  ss = ss.slice(0, startIdx) + newMapPanel + ss.slice(endIdx);
  fs.writeFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React-V2/src/components/StoryScroll.jsx", ss, "utf8");
  console.log("V2 StoryScroll.jsx MapPanel patched: " + ss.length + " bytes");
} else {
  console.error("StoryScroll: MapPanel NOT FOUND");
}
