import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Truck, Globe, Clock, Zap, Award, Shield } from 'lucide-react';

const PILLARS = [
  { stat:'25+',  label:'Years Experience', sub:'Trusted since 1998',                 icon:Star,   accent:'#FACC15' },
  { stat:'140+', label:'Fleet Units',      sub:'Always ready to move',               icon:Truck,  accent:'#34D399' },
  { stat:'8',    label:'Countries',        sub:'East Africa coverage',               icon:Globe,  accent:'#60A5FA' },
  { stat:'98%',  label:'On-Time Rate',     sub:'Delivery reliability',               icon:Clock,  accent:'#A78BFA' },
  { stat:'24/7', label:'Operations',       sub:'Round-the-clock support',            icon:Zap,    accent:'#F87171' },
  { stat:'2010', label:'Award Winners',    sub:'International Transport Award',      icon:Award,  accent:'#FACC15' },
];

const container = { hidden:{}, visible:{ transition:{ staggerChildren:0.09 } } };
const item      = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.65,ease:[0.16,1,0.3,1]}} };

export default function WhyUs() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const headRef = useRef(null);
  const headIn  = useInView(headRef, { once:true, margin:'-60px' });

  return (
    <section id="why" className="sec bg-v2-light">
      <div className="wrap">
        {/* Header */}
        <motion.div ref={headRef}
          initial={{opacity:0,y:24}} animate={headIn?{opacity:1,y:0}:{}} transition={{duration:0.7}}
          className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-v2 bg-v2-green/10 text-v2-green border border-v2-green/20 mb-5">
            <Shield size={12} fill="currentColor"/>
            Why Roadtainers
          </span>
          <h2 className="heading-xl text-v2-text mb-4">
            The Difference is{' '}
            <span className="text-grad-green">Proven.</span>
          </h2>
          <p className="text-v2-gray text-lg leading-relaxed">
            Two decades of hard work, international recognition and an unbroken commitment to moving Africa's cargo right.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <motion.div ref={ref}
          variants={container} initial="hidden" animate={inView?'visible':'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div key={i} variants={item}
              className="group relative rounded-3xl bg-white border border-gray-100 p-7 overflow-hidden cursor-default
                         hover:border-transparent hover:shadow-2xl transition-all duration-400"
              whileHover={{ y:-6 }}
              transition={{ type:'spring', stiffness:260, damping:20 }}>

              {/* Accent top border */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
                style={{ backgroundColor:p.accent }}/>

              {/* Background number */}
              <div className="absolute -right-2 -bottom-4 text-[5.5rem] font-black leading-none select-none pointer-events-none transition-all duration-500"
                style={{ color:`${p.accent}12` }}>
                {p.stat}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                style={{ backgroundColor:`${p.accent}15`, border:`1.5px solid ${p.accent}30` }}>
                <p.icon size={22} style={{ color:p.accent }}/>
              </div>

              {/* Stat */}
              <div className="text-5xl font-black text-v2-text mb-1 leading-none">{p.stat}</div>
              <div className="text-v2-text font-bold text-lg mb-1">{p.label}</div>
              <div className="text-v2-gray text-sm">{p.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.6}}
          className="mt-16 rounded-3xl bg-v2-green p-1">
          <div className="bg-white rounded-[22px] px-10 py-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div>
              <div className="text-xl font-black text-v2-text mb-1">Kenya's Most Efficient Transport Company</div>
              <div className="text-v2-gray text-sm">Recognised by industry peers, international trade bodies and customers for 25+ years.</div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {[...Array(5)].map((_,i)=>( <Star key={i} size={20} className="text-v2-yellow" fill="#FACC15"/> ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
