import { useState, useRef, useEffect } from 'react';
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

              <div className="relative" style={{paddingBottom:"71.4%"}}>
                <svg viewBox="0 0 700 500" className="absolute inset-0 w-full h-full">
                  <defs>
                    <clipPath id="ea-v2-clip"><rect x="0" y="0" width="700" height="500"/></clipPath>
                    <pattern id="ea-v2-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0L0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/></pattern>
                    <radialGradient id="ea-v2-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FACC15" stopOpacity="0.45"/><stop offset="100%" stopColor="#FACC15" stopOpacity="0"/></radialGradient>
                    <filter id="ea-v2-blur"><feGaussianBlur stdDeviation="10"/></filter>
                  </defs>
                  <rect width="700" height="500" fill="#020c08"/>
                  <rect width="700" height="500" fill={"url(#ea-v2-grid)"} opacity="0.035"/>
                  <text x="640" y="290" textAnchor="middle" fontSize="8" fill="rgba(100,180,255,0.15)" fontFamily="Inter,sans-serif" fontStyle="italic">Indian Ocean</text>
                  <g clipPath={"url(#ea-v2-clip)"}>
                    <path key="Somalia" d={"M493.394,299.673L479.398,280.206L479.143,194.358L499.755,167.592L506.202,160.156L521.301,159.716L542.252,143.032L572.958,141.991L639.545,70.818L656.001,50.942L666.604,36.28L666.604,23.818L666.604,-0.354L666.689,-10.273L666.858,-10.639L674.408,-11.128L685.265,-14.709L697.734,-17.111L708.931,-25.342L717.838,-25.424L718.347,-18.781L716.226,-4.783L716.311,7.807L711.306,16.485L704.69,42.342L693.323,68.925L678.734,99.291L658.546,134.023L638.442,160.476L610.705,192.681L587.124,211.801L551.922,235.18L529.953,253.127L504.166,281.642L498.738,294.087Z"} fill="#0c2216" fillOpacity="0.68" stroke="#1c3d28" strokeWidth="0.4" strokeOpacity="0.45" />
                    <path key="Zambia" d={"M237.819,457.213L247.659,463.261L257.074,467.254L272.088,471.29L285.406,478.439L296.518,489.112L302.54,509.407L298.553,515.9L293.803,535.373L298.299,555.353L290.919,563.73L283.709,586.223L296.178,592.507L224.672,612.558L226.877,629.952L209.064,633.305L195.577,643.047L192.778,651.561L184.296,653.474L163.853,673.728L150.79,689.754L142.817,690.299L135.183,687.449L108.802,684.727L104.561,682.885L104.391,680.835L95.146,675.274L79.877,673.854L60.538,679.454L45.184,664.049L29.238,643.96L30.34,566.512L79.453,566.798L77.417,558.498L80.895,549.434L76.739,538.142L79.453,526.504L76.993,519.026L85.136,519.636L86.409,527.114L97.521,526.504L112.45,528.74L120.338,539.649L139.169,543.032L153.589,535.414L158.848,548.047L176.916,551.393L185.653,561.686L195.323,574.987L213.305,575.191L211.354,549.148L204.908,553.515L188.452,544.132L182.09,539.853L184.974,515.737L189.131,487.413L183.871,476.863L190.573,461.647L196.934,458.785L228.574,454.795Z"} fill="#0c2216" fillOpacity="0.68" stroke="#1c3d28" strokeWidth="0.4" strokeOpacity="0.45" />
                    <path key="Malawi" d={"M285.406,478.439L308.562,482.884L313.228,489.517L321.286,500.65L327.818,533.297L321.286,551.597L327.818,583.022L336.045,582.653L344.528,590.494L354.367,608.064L356.403,639.48L346.224,644.624L339.014,661.674L323.661,646.493L321.88,629.207L326.884,617.881L325.527,608.105L316.197,601.967L309.665,604.191L296.178,592.507L283.709,586.223L290.919,563.73L298.299,555.353L293.803,535.373L298.553,515.9L302.54,509.407L296.518,489.112Z"} fill="#0c2216" fillOpacity="0.68" stroke="#1c3d28" strokeWidth="0.4" strokeOpacity="0.45" />
                    <path key="Mozambique" d={"M327.818,533.297L345.546,531.344L373.877,538.102L380.069,535.088L396.44,534.437L404.838,527.236L419.003,527.642L444.705,518.295L463.451,504.419L467.268,515.169L466.335,539.079L469.219,560.255L470.152,598.099L474.308,610.042L467.268,627.469L458.107,644.458L443.093,659.674L421.548,669.053L394.998,681.044L368.448,707.648L359.372,712.196L342.916,729.932L333.161,735.692L331.21,753.575L342.407,772.697L346.988,787.532L347.327,795.145L351.483,793.896L350.805,818.904L346.988,830.846L352.501,835.242L349.023,845.93L339.184,855.163L319.759,863.894L291.428,877.985L281.08,887.665L283.115,898.663L289.138,900.441L287.102,914.297L269.204,914.074L267.168,902.442L263.691,890.677L261.74,881.297L265.896,852.316L259.789,834.022L248.507,797.988L273.276,769.19L279.553,751.022L283.115,748.767L285.745,733.997L281.928,726.591L282.946,707.943L287.526,690.76L287.526,659.508L275.227,651.603L264.03,649.816L258.941,643.753L248.083,638.568L228.404,639.065L226.877,629.952L224.672,612.558L296.178,592.507L309.665,604.191L316.197,601.967L325.527,608.105L326.884,617.881L321.88,629.207L323.661,646.493L339.014,661.674L346.224,644.624L356.403,639.48L354.367,608.064L344.528,590.494L336.045,582.653L327.818,583.022L321.286,551.597Z"} fill="#0c2216" fillOpacity="0.68" stroke="#1c3d28" strokeWidth="0.4" strokeOpacity="0.45" />
                    <path key="Sudan" d={"M92.431,65.42L74.449,55.018L66.306,48.157L64.779,40.726L68.596,30.779L68.511,21.023L54.939,6.062L52.31,-4.214L52.564,-10.029L43.912,-17.111L43.658,-31.094L38.738,-40.406L30.425,-39.016L32.8,-47.89L38.907,-57.965L36.193,-68.017L43.997,-75.454L39.077,-81.131L45.269,-96.175L56.042,-114.162L76.4,-112.464L75.212,-210.596L75.467,-221.107L102.61,-221.192L102.61,-271.602L197.358,-271.602L288.714,-271.602L382.19,-271.602L389.824,-246.74L384.649,-242.172L388.042,-216.314L396.694,-186.498L405.686,-180.401L418.579,-171.208L406.619,-157.1L389.315,-153.047L381.85,-145.494L379.56,-129.138L369.381,-93.204L371.926,-83.478L368.109,-62.599L358.609,-38.771L344.358,-26.81L334.264,-8.443L331.889,1.352L320.692,8.091L313.737,33.126L314.076,54.574L313.822,35.997L310.513,35.511L310.938,23.615L308.138,15.391L296.009,5.94L293.125,-11.372L296.009,-29.135L285.066,-30.808L283.455,-25.424L269.289,-24.201L274.972,-17.152L276.923,-2.71L264.03,10.444L252.324,27.704L240.11,30.173L220.346,16.202L211.439,21.145L208.979,28.109L196.849,32.64L196.086,37.573L172.59,37.573L169.367,32.64L152.402,31.831L143.919,35.916L137.388,33.854L125.258,19.93L121.187,13.323L104.222,16.607L97.775,27.704L91.668,49.045L83.61,53.525L76.4,56.147Z"} fill="#0c2216" fillOpacity="0.68" stroke="#1c3d28" strokeWidth="0.4" strokeOpacity="0.45" />
                    <path key="CAR" d={"M158.509,136.506L150.79,139.028L135.691,138.468L117.963,135.985L109.142,138.027L105.664,143.752L98.03,144.473L88.699,139.469L62.489,151.276L51.716,148.875L48.493,150.716L41.452,164.994L23.894,160.396L6.674,158.036L-8.339,149.315L-27.764,141.311L-40.403,148.915L-49.564,160.915L-51.684,177.383L-66.783,176.065L-82.73,172.109L-96.811,184.614L-109.195,206.573L-111.655,199.708L-112.673,188.967L-123.445,181.378L-132.182,169.191L-134.133,160.716L-145.33,148.355L-143.379,141.311L-145.754,131.339L-143.973,112.978L-138.29,108.685L-126.414,84.622L-106.99,82.852L-102.579,76.736L-98.677,77.179L-92.824,82.57L-63.136,73.475L-53.126,64.211L-40.827,55.865L-43.202,47.471L-36.586,45.29L-13.768,46.744L8.371,35.714L25.42,9.592L37.381,-0.11L52.31,-4.214L54.939,6.062L68.511,21.023L68.596,30.779L64.779,40.726L66.306,48.157L74.449,55.018L92.431,65.42L105.325,75.045L105.494,82.771L121.356,95.153L131.196,105.394L137.133,119.636L154.777,129.015Z"} fill="#0c2216" fillOpacity="0.68" stroke="#1c3d28" strokeWidth="0.4" strokeOpacity="0.45" />
                    <path key="Eritrea" d={"M371.926,-83.478L369.381,-93.204L379.56,-129.138L381.85,-145.494L389.315,-153.047L406.619,-157.1L418.579,-171.208L432.236,-142.619L438.767,-120.089L451.66,-108.159L483.809,-85.125L496.871,-71.303L509.68,-57.309L517.06,-48.995L528.596,-41.714L521.555,-35.83L511.461,-37.913L503.403,-45.721L493.733,-59.892L483.215,-67.688L477.192,-76.071L456.665,-85.825L440.464,-86.114L434.78,-91.225L420.954,-85.496L406.704,-96.547L399.324,-78.374Z"} fill="#0c2216" fillOpacity="0.68" stroke="#1c3d28" strokeWidth="0.4" strokeOpacity="0.45" />
                    <path key="Djibouti" d={"M511.461,-37.913L521.555,-35.83L528.596,-41.714L534.194,-34.237L533.431,-24.242L520.028,-18.455L530.122,-11.901L521.47,0.987L516.211,-3.32L510.528,-1.613L497.38,-2.02L497.041,-9.338L495.175,-15.971L503.148,-27.259Z"} fill="#0c2216" fillOpacity="0.68" stroke="#1c3d28" strokeWidth="0.4" strokeOpacity="0.45" />
                    <path d={"M204.823,366.136L209.064,387.913L206.774,400.217L211.439,413.977L225.096,427.23L237.819,457.213L228.574,454.795L196.934,458.785L190.573,461.647L183.871,476.863L189.131,487.413L184.974,515.737L182.09,539.853L188.452,544.132L204.908,553.515L211.354,549.148L213.305,575.191L195.323,574.987L185.653,561.686L176.916,551.393L158.848,548.047L153.589,535.414L139.169,543.032L120.338,539.649L112.45,528.74L97.521,526.504L86.409,527.114L85.136,519.636L76.993,519.026L66.221,517.605L51.631,521.22L41.367,520.611L35.599,522.805L36.872,494.292L28.983,485.431L27.202,470.766L30.68,456.407L25.929,447.222L25.505,432.255L-3.08,432.456L-1.045,423.895L-13.09,423.976L-14.362,428.115L-28.952,429.039L-34.804,442.874L-38.367,448.833L-51.43,445.491L-59.149,448.833L-74.756,450.726L-83.748,438.287L-89.177,430.607L-95.962,416.385L-101.73,398.733L-171.286,398.412L-179.599,401.259L-186.385,400.818L-196.139,403.986L-199.448,396.649L-193.425,394.164L-192.662,383.827L-188.845,377.741L-180.277,372.778L-174.085,375.18L-166.027,366.136L-153.134,366.376L-151.692,373.058L-142.87,377.261L-128.959,362.457L-115.302,350.902L-109.28,343.349L-110.128,323.938L-99.864,301.029L-89.092,288.902L-73.569,277.534L-70.855,269.996L-70.261,261.382L-66.444,253.207L-67.631,239.846L-64.747,218.944L-60.082,204.258L-53.042,191.643L-51.684,177.383L-49.564,160.915L-40.403,148.915L-27.764,141.311L-8.339,149.315L6.674,158.036L23.894,160.396L41.452,164.994L48.493,150.716L51.716,148.875L62.489,151.276L88.699,139.469L98.03,144.473L105.664,143.752L109.142,138.027L117.963,135.985L135.691,138.468L150.79,139.028L158.509,136.506L172.844,156.036L183.362,158.876L189.724,154.916L200.582,156.476L213.729,151.476L219.328,161.555L240.025,177.263L238.668,204.857L248.083,208.05L240.534,216.43L231.458,222.694L222.466,234.98L217.462,245.909L216.189,264.852L210.676,273.825L210.506,291.614L203.72,298.197L202.872,312.202L199.649,314.038L197.443,326.932L203.381,337.636Z"} fill="#0F7B46" fillOpacity="0.2" stroke="#2ddf80" strokeWidth="0.7" strokeOpacity="0.5" />
                    <path d={"M240.025,177.263L219.328,161.555L213.729,151.476L200.582,156.476L189.724,154.916L183.362,158.876L172.844,156.036L158.509,136.506L154.777,129.015L137.133,119.636L131.196,105.394L121.356,95.153L105.494,82.771L105.325,75.045L92.431,65.42L76.4,56.147L83.61,53.525L91.668,49.045L97.775,27.704L104.222,16.607L121.187,13.323L125.258,19.93L137.388,33.854L143.919,35.916L152.402,31.831L169.367,32.64L172.59,37.573L196.086,37.573L196.849,32.64L208.979,28.109L211.439,21.145L220.346,16.202L240.11,30.173L252.324,27.704L264.03,10.444L276.923,-2.71L274.972,-17.152L269.289,-24.201L283.455,-25.424L285.066,-30.808L296.009,-29.135L293.125,-11.372L296.009,5.94L308.138,15.391L310.938,23.615L310.513,35.511L313.822,35.997L314.076,54.574L310.513,61.873L298.044,62.437L289.986,76.011L304.491,77.702L316.451,89.286L320.523,98.769L331.295,104.27L345.206,130.057L329.26,145.674L314.755,159.756L300.25,170.63L283.709,170.59L264.709,176.105L249.78,170.83Z"} fill="#0F7B46" fillOpacity="0.24" stroke="#2ddf80" strokeWidth="0.8" strokeOpacity="0.55" />
                    <path d={"M639.545,70.818L572.958,141.991L542.252,143.032L521.301,159.716L506.202,160.156L499.755,167.592L483.639,167.592L474.139,159.596L452.593,169.471L445.638,179.341L429.945,177.463L424.686,174.746L419.173,175.386L411.793,175.146L381.935,155.076L365.564,155.076L357.506,147.315L357.506,134.023L345.206,130.057L331.295,104.27L320.523,98.769L316.451,89.286L304.491,77.702L289.986,76.011L298.044,62.437L310.513,61.873L314.076,54.574L313.737,33.126L320.692,8.091L331.889,1.352L334.264,-8.443L344.358,-26.81L358.609,-38.771L368.109,-62.599L371.926,-83.478L399.324,-78.374L406.704,-96.547L420.954,-85.496L434.78,-91.225L440.464,-86.114L456.665,-85.825L477.192,-76.071L483.215,-67.688L493.733,-59.892L503.403,-45.721L511.461,-37.913L503.148,-27.259L495.175,-15.971L497.041,-9.338L497.38,-2.02L510.528,-1.613L516.211,-3.32L521.47,0.987L516.296,9.47L525.033,22.644L533.685,34.177L542.676,42.665L619.781,70.979Z"} fill="#0F7B46" fillOpacity="0.26" stroke="#2ddf80" strokeWidth="0.8" strokeOpacity="0.58" />
                    <path d={"M312.38,282.4L264.369,284.195L238.583,283.916L230.27,286.748L216.189,294.008L210.506,291.614L210.676,273.825L216.189,264.852L217.462,245.909L222.466,234.98L231.458,222.694L240.534,216.43L248.083,208.05L238.668,204.857L240.025,177.263L249.78,170.83L264.709,176.105L283.709,170.59L300.25,170.63L314.755,159.756L325.951,176.185L328.666,188.009L339.099,215.073L330.532,232.268L318.911,247.863L312.125,257.394Z"} fill="#0F7B46" fillOpacity="0.3" stroke="#22c55e" strokeWidth="0.9" strokeOpacity="0.65" />
                    <path d={"M230.27,286.748L239.601,300.032L238.244,313.918L231.458,316.872L218.989,315.355L211.778,328.769L197.443,326.932L199.649,314.038L202.872,312.202L203.72,298.197L210.506,291.614L216.189,294.008Z"} fill="#0F7B46" fillOpacity="0.34" stroke="#22c55e" strokeWidth="0.9" strokeOpacity="0.7" />
                    <path d={"M231.458,316.872L232.815,326.174L237.904,331.525L238.159,339.194L232.306,344.148L223.145,356.458L214.578,365.016L204.823,366.136L203.381,337.636L197.443,326.932L211.778,328.769L218.989,315.355Z"} fill="#0F7B46" fillOpacity="0.34" stroke="#22c55e" strokeWidth="0.9" strokeOpacity="0.7" />
                    <path d={"M312.38,282.4L316.366,284.993L401.784,333.002L403.396,346.705L437.24,370.297L426.383,399.455L427.74,412.893L442.839,421.566L443.517,427.713L437.071,442.069L438.428,449.316L436.901,460.68L445.129,475.611L454.884,499.192L463.451,504.419L444.705,518.295L419.003,527.642L404.838,527.236L396.44,534.437L380.069,535.088L373.877,538.102L345.546,531.344L327.818,533.297L321.286,500.65L313.228,489.517L308.562,482.884L285.406,478.439L272.088,471.29L257.074,467.254L247.659,463.261L237.819,457.213L225.096,427.23L211.439,413.977L206.774,400.217L209.064,387.913L204.823,366.136L214.578,365.016L223.145,356.458L232.306,344.148L238.159,339.194L237.904,331.525L232.815,326.174L231.458,316.872L238.244,313.918L239.601,300.032L230.27,286.748L238.583,283.916L264.369,284.195Z"} fill="#0F7B46" fillOpacity="0.3" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.68" />
                    <path d={"M437.24,370.297L403.396,346.705L401.784,333.002L316.366,284.993L312.38,282.4L312.125,257.394L318.911,247.863L330.532,232.268L339.099,215.073L328.666,188.009L325.951,176.185L314.755,159.756L329.26,145.674L345.206,130.057L357.506,134.023L357.506,147.315L365.564,155.076L381.935,155.076L411.793,175.146L419.173,175.386L424.686,174.746L429.945,177.463L445.638,179.341L452.593,169.471L474.139,159.596L483.639,167.592L499.755,167.592L479.143,194.358L479.398,280.206L493.394,299.673L476.853,309.089L471.085,318.908L462.263,320.664L458.87,337.276L451.321,346.785L446.741,362.497Z"} fill="#0F7B46" fillOpacity="0.4" stroke="#34d399" strokeWidth="1.3" strokeOpacity="0.9" />
                    <ellipse cx="291" cy="282" rx="36" ry="40" fill="#0d3a5e" fillOpacity="0.75" stroke="#1d6fa8" strokeWidth="0.8" strokeOpacity="0.65"/>
                    <text x="291" y="286" textAnchor="middle" fontSize="6.5" fontStyle="italic" fill="rgba(130,200,255,0.55)" fontFamily="Inter,sans-serif">L. Victoria</text>
                    <text x={420} y={248} textAnchor="middle" fill={"rgba(255,255,255,0.72)"} fontSize={10.5} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">KENYA</text>
                    <text x={336} y={418} textAnchor="middle" fill={"rgba(255,255,255,0.65)"} fontSize={10} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">TANZANIA</text>
                    <text x={258} y={226} textAnchor="middle" fill={"rgba(255,255,255,0.62)"} fontSize={9.5} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">UGANDA</text>
                    <text x={444} y={68} textAnchor="middle" fill={"rgba(255,255,255,0.58)"} fontSize={10} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">ETHIOPIA</text>
                    <text x={218} y={97} textAnchor="middle" fill={"rgba(255,255,255,0.55)"} fontSize={9} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">S. SUDAN</text>
                    <text x={198} y={300} textAnchor="middle" fill={"rgba(255,255,255,0.55)"} fontSize={7.5} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">RWANDA</text>
                    <text x={188} y={340} textAnchor="middle" fill={"rgba(255,255,255,0.52)"} fontSize={7.5} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">BURUNDI</text>
                    <text x={108} y={395} textAnchor="middle" fill={"rgba(255,255,255,0.42)"} fontSize={9} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">DRC</text>
                    <text x={588} y={157} textAnchor="middle" fill={"rgba(255,255,255,0.26)"} fontSize={9} fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.12em">SOMALIA</text>
                  </g>
                  <circle cx="381" cy="290" r="35" fill={"url(#ea-v2-glow)"} filter={"url(#ea-v2-blur)"}/>
                  <motion.path key="mombasanairobi" d={"M448,356 Q426,311 381,290"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:0.40,ease:"easeOut"}} />
                  <motion.path key="nairobieldoret" d={"M381,290 Q371,263 345,248"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:0.48,ease:"easeOut"}} />
                  <motion.path key="eldoretkampala" d={"M345,248 Q312,238 281,252"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:0.56,ease:"easeOut"}} />
                  <motion.path key="nairobikisumu" d={"M381,290 Q362,267 333,262"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:0.64,ease:"easeOut"}} />
                  <motion.path key="kisumukampala" d={"M333,262 Q309,248 281,252"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:0.72,ease:"easeOut"}} />
                  <motion.path key="kampalajuba" d={"M281,252 Q289,195 258,146"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:0.80,ease:"easeOut"}} />
                  <motion.path key="kampalakigali" d={"M281,252 Q242,268 222,306"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:0.88,ease:"easeOut"}} />
                  <motion.path key="kigalibujumbura" d={"M222,306 Q207,320 205,340"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:0.96,ease:"easeOut"}} />
                  <motion.path key="kampalamwanza" d={"M281,252 Q273,287 289,319"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:1.04,ease:"easeOut"}} />
                  <motion.path key="mwanzadar" d={"M289,319 Q345,396 438,420"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:1.12,ease:"easeOut"}} />
                  <motion.path key="nairobiarusha" d={"M381,290 Q371,314 378,339"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:1.20,ease:"easeOut"}} />
                  <motion.path key="arushadar" d={"M378,339 Q393,390 438,420"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:1.28,ease:"easeOut"}} />
                  <motion.path key="addisnairobi" d={"M426,47 Q360,160 381,290"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:1.36,ease:"easeOut"}} />
                  <motion.path key="addisjuba" d={"M426,47 Q324,66 258,146"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:1.44,ease:"easeOut"}} />
                  <motion.path key="mombasadar" d={"M448,356 Q431,386 438,420"} fill="none" stroke="#0F7B46" strokeWidth="1.8" strokeDasharray="6 4" strokeOpacity="0.75" initial={{pathLength:0,opacity:0}} animate={inView?{pathLength:1,opacity:1}:{}} transition={{duration:2.5,delay:1.52,ease:"easeOut"}} />
                  <circle key={"dot-mombasanairobi"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0s" path={"M448,356 Q426,311 381,290"} /></circle>
                  <circle key={"dot-nairobieldoret"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="3.2s" repeatCount="indefinite" begin="0.6s" path={"M381,290 Q371,263 345,248"} /></circle>
                  <circle key={"dot-eldoretkampala"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="4s" repeatCount="indefinite" begin="1s" path={"M345,248 Q312,238 281,252"} /></circle>
                  <circle key={"dot-nairobikisumu"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="3s" repeatCount="indefinite" begin="0.4s" path={"M381,290 Q362,267 333,262"} /></circle>
                  <circle key={"dot-kisumukampala"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="3.2s" repeatCount="indefinite" begin="1.2s" path={"M333,262 Q309,248 281,252"} /></circle>
                  <circle key={"dot-kampalajuba"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="4.5s" repeatCount="indefinite" begin="0.2s" path={"M281,252 Q289,195 258,146"} /></circle>
                  <circle key={"dot-kampalakigali"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="3.8s" repeatCount="indefinite" begin="0.8s" path={"M281,252 Q242,268 222,306"} /></circle>
                  <circle key={"dot-kigalibujumbura"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="2.5s" repeatCount="indefinite" begin="1.4s" path={"M222,306 Q207,320 205,340"} /></circle>
                  <circle key={"dot-kampalamwanza"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0.3s" path={"M281,252 Q273,287 289,319"} /></circle>
                  <circle key={"dot-mwanzadar"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="4.2s" repeatCount="indefinite" begin="1.8s" path={"M289,319 Q345,396 438,420"} /></circle>
                  <circle key={"dot-nairobiarusha"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="3s" repeatCount="indefinite" begin="0.7s" path={"M381,290 Q371,314 378,339"} /></circle>
                  <circle key={"dot-arushadar"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="3.5s" repeatCount="indefinite" begin="1.1s" path={"M378,339 Q393,390 438,420"} /></circle>
                  <circle key={"dot-addisnairobi"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="5s" repeatCount="indefinite" begin="0s" path={"M426,47 Q360,160 381,290"} /></circle>
                  <circle key={"dot-addisjuba"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="4.8s" repeatCount="indefinite" begin="0.5s" path={"M426,47 Q324,66 258,146"} /></circle>
                  <circle key={"dot-mombasadar"} r="3.5" fill="#FACC15" opacity="0.95"><animateMotion dur="4s" repeatCount="indefinite" begin="1.3s" path={"M448,356 Q431,386 438,420"} /></circle>
                  <g key="addis" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"addis","name":"Addis Ababa","country":"Ethiopia","px":426,"py":47,"hub":true})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={426} cy={47} r="16" fill="none" stroke="#FACC15" strokeWidth="1.5" opacity="0"><animate attributeName="r" values="12;26;12" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/></circle><circle cx={426} cy={47} r="10" fill="none" stroke="#FACC15" strokeWidth="1" opacity="0.3"><animate attributeName="r" values="8;18;8" dur="3s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin="0.5s" repeatCount="indefinite"/></circle>
                    <circle cx={426} cy={47} r={7} fill="#FACC15" stroke="#ffffff" strokeWidth="2.5" />
                    <text x={437} y={51} fill="rgba(255,255,255,0.96)" fontSize="10.5" fontWeight="700" fontFamily="Inter,sans-serif">Addis Ababa</text>
                  </g>
                  <g key="juba" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"juba","name":"Juba","country":"S. Sudan","px":258,"py":146,"hub":true})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={258} cy={146} r="16" fill="none" stroke="#FACC15" strokeWidth="1.5" opacity="0"><animate attributeName="r" values="12;26;12" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/></circle><circle cx={258} cy={146} r="10" fill="none" stroke="#FACC15" strokeWidth="1" opacity="0.3"><animate attributeName="r" values="8;18;8" dur="3s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin="0.5s" repeatCount="indefinite"/></circle>
                    <circle cx={258} cy={146} r={7} fill="#FACC15" stroke="#ffffff" strokeWidth="2.5" />
                    <text x={269} y={150} fill="rgba(255,255,255,0.96)" fontSize="10.5" fontWeight="700" fontFamily="Inter,sans-serif">Juba</text>
                  </g>
                  <g key="kampala" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"kampala","name":"Kampala","country":"Uganda","px":281,"py":252,"hub":true})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={281} cy={252} r="16" fill="none" stroke="#FACC15" strokeWidth="1.5" opacity="0"><animate attributeName="r" values="12;26;12" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/></circle><circle cx={281} cy={252} r="10" fill="none" stroke="#FACC15" strokeWidth="1" opacity="0.3"><animate attributeName="r" values="8;18;8" dur="3s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin="0.5s" repeatCount="indefinite"/></circle>
                    <circle cx={281} cy={252} r={7} fill="#FACC15" stroke="#ffffff" strokeWidth="2.5" />
                    <text x={292} y={256} fill="rgba(255,255,255,0.96)" fontSize="10.5" fontWeight="700" fontFamily="Inter,sans-serif">Kampala</text>
                  </g>
                  <g key="kigali" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"kigali","name":"Kigali","country":"Rwanda","px":222,"py":306,"hub":false})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={222} cy={306} r="8" fill="none" stroke="#0F7B46" strokeWidth="0.8" opacity="0.22"><animate attributeName="r" values="5;11;5" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.25;0;0.25" dur="3.5s" repeatCount="indefinite"/></circle>
                    <circle cx={222} cy={306} r={4.5} fill="#2ddf80" stroke="#FACC15" strokeWidth="1.5" />
                    <text x={230} y={310} fill="rgba(255,255,255,0.68)" fontSize="8.5" fontWeight="500" fontFamily="Inter,sans-serif">Kigali</text>
                  </g>
                  <g key="bujumbura" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"bujumbura","name":"Bujumbura","country":"Burundi","px":205,"py":340,"hub":false})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={205} cy={340} r="8" fill="none" stroke="#0F7B46" strokeWidth="0.8" opacity="0.22"><animate attributeName="r" values="5;11;5" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.25;0;0.25" dur="3.5s" repeatCount="indefinite"/></circle>
                    <circle cx={205} cy={340} r={4.5} fill="#2ddf80" stroke="#FACC15" strokeWidth="1.5" />
                    <text x={213} y={344} fill="rgba(255,255,255,0.68)" fontSize="8.5" fontWeight="500" fontFamily="Inter,sans-serif">Bujumbura</text>
                  </g>
                  <g key="eldoret" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"eldoret","name":"Eldoret","country":"Kenya","px":345,"py":248,"hub":false})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={345} cy={248} r="8" fill="none" stroke="#0F7B46" strokeWidth="0.8" opacity="0.22"><animate attributeName="r" values="5;11;5" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.25;0;0.25" dur="3.5s" repeatCount="indefinite"/></circle>
                    <circle cx={345} cy={248} r={4.5} fill="#2ddf80" stroke="#FACC15" strokeWidth="1.5" />
                    <text x={353} y={252} fill="rgba(255,255,255,0.68)" fontSize="8.5" fontWeight="500" fontFamily="Inter,sans-serif">Eldoret</text>
                  </g>
                  <g key="kisumu" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"kisumu","name":"Kisumu","country":"Kenya","px":333,"py":262,"hub":false})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={333} cy={262} r="8" fill="none" stroke="#0F7B46" strokeWidth="0.8" opacity="0.22"><animate attributeName="r" values="5;11;5" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.25;0;0.25" dur="3.5s" repeatCount="indefinite"/></circle>
                    <circle cx={333} cy={262} r={4.5} fill="#2ddf80" stroke="#FACC15" strokeWidth="1.5" />
                    <text x={341} y={266} fill="rgba(255,255,255,0.68)" fontSize="8.5" fontWeight="500" fontFamily="Inter,sans-serif">Kisumu</text>
                  </g>
                  <g key="nairobi" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"nairobi","name":"Nairobi","country":"Kenya","px":381,"py":290,"hub":true})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={381} cy={290} r="16" fill="none" stroke="#FACC15" strokeWidth="1.5" opacity="0"><animate attributeName="r" values="12;26;12" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/></circle><circle cx={381} cy={290} r="10" fill="none" stroke="#FACC15" strokeWidth="1" opacity="0.3"><animate attributeName="r" values="8;18;8" dur="3s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin="0.5s" repeatCount="indefinite"/></circle>
                    <circle cx={381} cy={290} r={7} fill="#FACC15" stroke="#ffffff" strokeWidth="2.5" />
                    <text x={392} y={294} fill="rgba(255,255,255,0.96)" fontSize="10.5" fontWeight="700" fontFamily="Inter,sans-serif">Nairobi</text>
                  </g>
                  <g key="mombasa" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"mombasa","name":"Mombasa","country":"Kenya","px":448,"py":356,"hub":true})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={448} cy={356} r="16" fill="none" stroke="#FACC15" strokeWidth="1.5" opacity="0"><animate attributeName="r" values="12;26;12" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/></circle><circle cx={448} cy={356} r="10" fill="none" stroke="#FACC15" strokeWidth="1" opacity="0.3"><animate attributeName="r" values="8;18;8" dur="3s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin="0.5s" repeatCount="indefinite"/></circle>
                    <circle cx={448} cy={356} r={7} fill="#FACC15" stroke="#ffffff" strokeWidth="2.5" />
                    <text x={459} y={360} fill="rgba(255,255,255,0.96)" fontSize="10.5" fontWeight="700" fontFamily="Inter,sans-serif">Mombasa</text>
                  </g>
                  <g key="mwanza" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"mwanza","name":"Mwanza","country":"Tanzania","px":289,"py":319,"hub":false})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={289} cy={319} r="8" fill="none" stroke="#0F7B46" strokeWidth="0.8" opacity="0.22"><animate attributeName="r" values="5;11;5" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.25;0;0.25" dur="3.5s" repeatCount="indefinite"/></circle>
                    <circle cx={289} cy={319} r={4.5} fill="#2ddf80" stroke="#FACC15" strokeWidth="1.5" />
                    <text x={297} y={323} fill="rgba(255,255,255,0.68)" fontSize="8.5" fontWeight="500" fontFamily="Inter,sans-serif">Mwanza</text>
                  </g>
                  <g key="arusha" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"arusha","name":"Arusha","country":"Tanzania","px":378,"py":339,"hub":false})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={378} cy={339} r="8" fill="none" stroke="#0F7B46" strokeWidth="0.8" opacity="0.22"><animate attributeName="r" values="5;11;5" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.25;0;0.25" dur="3.5s" repeatCount="indefinite"/></circle>
                    <circle cx={378} cy={339} r={4.5} fill="#2ddf80" stroke="#FACC15" strokeWidth="1.5" />
                    <text x={386} y={343} fill="rgba(255,255,255,0.68)" fontSize="8.5" fontWeight="500" fontFamily="Inter,sans-serif">Arusha</text>
                  </g>
                  <g key="dar" style={{cursor:"pointer"}} onMouseEnter={()=>setTooltip({"id":"dar","name":"Dar es Salaam","country":"Tanzania","px":438,"py":420,"hub":true})} onMouseLeave={()=>setTooltip(null)}>
                    <circle cx={438} cy={420} r="16" fill="none" stroke="#FACC15" strokeWidth="1.5" opacity="0"><animate attributeName="r" values="12;26;12" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/></circle><circle cx={438} cy={420} r="10" fill="none" stroke="#FACC15" strokeWidth="1" opacity="0.3"><animate attributeName="r" values="8;18;8" dur="3s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin="0.5s" repeatCount="indefinite"/></circle>
                    <circle cx={438} cy={420} r={7} fill="#FACC15" stroke="#ffffff" strokeWidth="2.5" />
                    <text x={449} y={424} fill="rgba(255,255,255,0.96)" fontSize="10.5" fontWeight="700" fontFamily="Inter,sans-serif">Dar es Salaam</text>
                  </g>
                </svg>
                {tooltip && (
                  <div className="absolute pointer-events-none bg-white rounded-xl shadow-xl px-4 py-3 text-sm border border-gray-100 z-20 whitespace-nowrap"
                    style={{left:(tooltip.px/700*100)+"%",top:(tooltip.py/500*100)+"%",transform:"translate(-50%,-130%)"}}>
                    <div className="font-bold text-v2-text">{tooltip.name}</div>
                    <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5"><MapPin size={10}/> {tooltip.country}</div>
                    {tooltip.hub&&<div className="text-green-600 text-xs font-semibold mt-0.5 flex items-center gap-1"><CheckCircle size={10}/>Active Hub</div>}
                  </div>
                )}
              </div>
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
}