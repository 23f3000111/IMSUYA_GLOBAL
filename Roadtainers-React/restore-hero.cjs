const fs = require("fs");
let v1 = fs.readFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React/src/components/Hero.jsx","utf8")
           .replace(/\r\n/g,"\n");

// The corruption point is: "{/* Stats row */}_MINI } from"
// We need to:
//   1. Keep everything up to and including "{/* Stats row */}"
//   2. Find the actual Stats row JSX content in the duplicated tail
//      The duplicated tail starts with "_MINI } from '../geoData.js';\n"
//      followed by the rest of the original Hero.jsx from its 3rd line onwards

const corruptJunction = "{/* Stats row */}_MINI } from '../geoData.js';";
const junctionIdx = v1.indexOf(corruptJunction);
if (junctionIdx === -1) { console.error("Junction not found"); process.exit(1); }

// Part A: Keep everything up to and including "{/* Stats row */}"
const partA = v1.slice(0, junctionIdx) + "{/* Stats row */}";

// Part B: The duplicated tail is everything after the junction
//         It starts with: "_MINI } from '../geoData.js';\nimport { Star, Truck...\n...\n"
//         and contains the full original file from line 3 onward
const tail = v1.slice(junctionIdx + corruptJunction.length);

// In the tail, find the actual Stats row JSX content.
// The stats row JSX starts with the actual <div> elements for stats,
// NOT with imports. Look for the first stats <div> or the second "{/* Stats row */}"
const statsJsx = "{/* Stats row */}";
const secondStats = tail.indexOf(statsJsx);
let partB;
if (secondStats !== -1) {
  // Found a second occurrence - use everything after it  
  partB = tail.slice(secondStats + statsJsx.length);
  console.log("Found second Stats row at tail offset", secondStats);
} else {
  // No second occurrence - look for the Stats row content directly
  // It should be some divs with stats like "Deliveries" "Routes" etc.
  // Try to find characteristic content
  const statDiv = "className=\"text-center\">";
  const statIdx = tail.indexOf(statDiv);
  partB = statIdx !== -1 ? tail.slice(statIdx - 20) : tail;
  console.log("Using statDiv fallback at", statIdx);
}

const fixed = partA + "\n" + partB;
fs.writeFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React/src/components/Hero.jsx", fixed, "utf8");
console.log("V1 Hero.jsx restored: " + fixed.length + " bytes, " + fixed.split("\n").length + " lines");

// Show what's around the junction in the fixed file
const statsPos = fixed.indexOf(statsJsx);
console.log("Stats row at:", statsPos);
const preview = fixed.slice(statsPos, statsPos + 200);
console.log("Preview:", preview.substring(0, 150));
