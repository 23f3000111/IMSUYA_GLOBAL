const fs = require("fs");

let h = fs.readFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React-V2/src/components/Hero.jsx","utf8")
          .replace(/\r\n/g,"\n");

// Find the broken header bar section
// It starts with the "{/* Header bar */}" comment
// and ends just before the SECOND map (identified by the "Real East Africa map \u2014" comment which uses an em dash \u2014)


const HEADER_START = '              {/* Header bar */}';
const CLEAN_MAP_DIV = '              <div className="relative rounded-2xl overflow-hidden mb-4 border border-white/5"\n                   style={{ background: \'linear-gradient(160deg,#020c08,#041510)\' }}>';

// Find where the header bar starts
const headerIdx = h.indexOf(HEADER_START);
if (headerIdx === -1) { console.error("Header bar not found"); process.exit(1); }

// Find the last occurrence of the clean map div BEFORE the bottom stats
const bottomStats = h.indexOf('{/* Bottom stats */}');
if (bottomStats === -1) { console.error("Bottom stats not found"); process.exit(1); }

// Find the second map div - it comes right before the bottom stats
// Search backwards from bottomStats to find it
let cleanMapIdx = h.lastIndexOf(CLEAN_MAP_DIV, bottomStats);
if (cleanMapIdx === -1) { console.error("Clean map div not found"); process.exit(1); }

// We'll replace everything from HEADER_START up to (not including) the clean map div
// with a proper header bar
const newHeaderBar = `              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-v2-green animate-pulse"/>
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">Live Operations</span>
                </div>
                <span className="text-white/30 text-xs">24 / 7</span>
              </div>

              {/* East Africa map */}
`;

h = h.slice(0, headerIdx) + newHeaderBar + h.slice(cleanMapIdx);

fs.writeFileSync("C:/Users/hp/Desktop/mock2/Roadtainers-React-V2/src/components/Hero.jsx", h, "utf8");
console.log("Hero V2 fixed: " + h.length + " bytes, " + h.split("\n").length + " lines");
console.log("Bottom stats at:", h.indexOf('{/* Bottom stats */}'));
