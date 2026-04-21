const fs = require("fs");
const sc=1350, CX=350, CY=260, LO=35.5*Math.PI/180;
const cities=[
 {id:"addis",lon:38.74,lat:8.99},{id:"juba",lon:31.58,lat:4.85},
 {id:"kampala",lon:32.58,lat:0.33},{id:"kigali",lon:30.06,lat:-1.95},
 {id:"bujumbura",lon:29.36,lat:-3.38},{id:"eldoret",lon:35.27,lat:0.52},
 {id:"kisumu",lon:34.76,lat:-0.10},{id:"nairobi",lon:36.82,lat:-1.29},
 {id:"mombasa",lon:39.67,lat:-4.05},{id:"mwanza",lon:32.90,lat:-2.52},
 {id:"arusha",lon:36.68,lat:-3.37},{id:"dar",lon:39.25,lat:-6.79}
];
cities.forEach(c=>{
  const l=c.lon*Math.PI/180;
  const p=c.lat*Math.PI/180;
  const x=sc*(l-LO)+CX;
  const y=sc*(-Math.log(Math.tan(Math.PI/4+p/2)))+CY;
  console.log(c.id+": px="+Math.round(x)+" py="+Math.round(y));
});
