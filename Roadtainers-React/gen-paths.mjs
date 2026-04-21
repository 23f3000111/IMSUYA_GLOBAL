import { readFileSync } from 'fs';
import { feature } from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';

const data = JSON.parse(readFileSync('./countries-110m.json', 'utf8'));

// ── Projection for BIG map (700x500) ──
const projBig = geoMercator().center([35.5,0]).scale(1350).translate([350,260]);
const pathBig = geoPath().projection(projBig);

// ── Projection for MINI map (600x480) ──
const projMini = geoMercator().center([35.5,0]).scale(1350).translate([300,250]);
const pathMini = geoPath().projection(projMini);

const TARGET = {
  Kenya:       404,
  Tanzania:    834,
  Uganda:      800,
  Rwanda:      646,
  Burundi:     108,
  Ethiopia:    231,
  SouthSudan:  728,
  DRC:         180,
  Somalia:     706,
  Sudan:       729,
  Mozambique:  508,
  Zambia:      894,
  Malawi:      454,
  CAR:         140,
  Eritrea:     232,
  Djibouti:    262,
};

const idToName = Object.fromEntries(Object.entries(TARGET).map(([k,v])=>[v,k]));

const geojson = feature(data, data.objects.countries);
const results = [];

for (const feat of geojson.features) {
  const id = parseInt(feat.id);
  const name = idToName[id];
  if (!name) continue;
  const dBig  = pathBig(feat);
  const dMini = pathMini(feat);
  const [cbx,cby] = pathBig.centroid(feat);
  const [cmx,cmy] = pathMini.centroid(feat);
  results.push({name,id,dBig,dMini,centroidBig:[Math.round(cbx),Math.round(cby)],centroidMini:[Math.round(cmx),Math.round(cmy)]});
}

console.log(JSON.stringify(results,null,2));
