import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Truck, Package, Droplets, ChevronsUpDown, Building2, Shuffle, Wrench, Layers, ArrowUpRight } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

const SERVICES = [
  { num:'01', name:'Heavy Transport',    icon:Truck,          desc:'Oversized and abnormal cargo hauling up to 120 tonnes across regional corridors.', img:'/images/Transport.jpg' },
  { num:'02', name:'Container Haulage',  icon:Package,        desc:'Port-to-door container movement with full documentation and GPS tracking.',           img:'/images/Safe & Smooth Movement.jpg' },
  { num:'03', name:'Tanker Services',    icon:Droplets,       desc:'ISO-certified tankers for fuel, water, chemicals and bulk liquid cargo.',              img:'/images/Tractor Trailers.jpg' },
  { num:'04', name:'Crane Services',     icon:ChevronsUpDown, desc:'Mobile and crawler cranes up to 200 tonnes for heavy lifting and installation.',      img:'/images/Lifting Facilities.jpg' },
  { num:'05', name:'Warehousing',        icon:Building2,      desc:'Secure transit and bonded warehousing at key logistics hubs across the region.',       img:'/images/Transit Facilities.jpg' },
  { num:'06', name:'Local Shunting',     icon:Shuffle,        desc:'Efficient in-port and intra-city cargo movement and container repositioning.',         img:'/images/General Cargo.jpg' },
  { num:'07', name:'Fleet Workshop',     icon:Wrench,         desc:'In-house maintenance facility ensuring fleet reliability and minimum downtime.',        img:'/images/Workshop.jpg' },
  { num:'08', name:'General Cargo',      icon:Layers,         desc:'Consolidated and LTL cargo delivery across urban and inter-city routes.',              img:'/images/Roadtainers_hero.jpg' },
];

const container = { hidden:{}, visible:{ transition:{ staggerChildren:0.07 } } };
const card      = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:[0.16,1,0.3,1]}} };

export default function Services() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once:true, margin:'-80px' });
  const headRef = useRef(null);
  const headIn  = useInView(headRef, { once:true, margin:'-60px' });

  return (
    <section id="services" className="sec" style={{ background:'linear-gradient(180deg,#050F09 0%,#0a1a0f 100%)' }}>
      <div className="wrap">
        {/* Header */}
        <motion.div ref={headRef}
          initial={{opacity:0,y:24}} animate={headIn?{opacity:1,y:0}:{}} transition={{duration:0.7}}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="badge-v2 bg-v2-green/15 text-v2-green border border-v2-green/25 mb-5">What We Move</span>
            <h2 className="heading-xl text-white">
              Eight Services.<br />
              <span className="text-grad-yellow">One Fleet.</span>
            </h2>
          </div>
          <p className="text-white/40 text-base max-w-xs leading-relaxed lg:text-right">
            From a single container to a 120-tonne abnormal load — we have the fleet, people and permits to deliver.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div ref={ref}
          variants={container} initial="hidden" animate={inView?'visible':'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((svc, i) => (
            <motion.a key={i} variants={card}
              href={SITE} target="_blank" rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden border border-white/8 cursor-pointer block"
              style={{ background:'rgba(255,255,255,0.06)' }}
              whileHover={{ y:-8, scale:1.05, borderColor:'rgba(15,123,70,0.6)', boxShadow:'0 0 40px rgba(15,123,70,0.30), 0 20px 60px rgba(0,0,0,0.5)' }}
              transition={{ type:'spring', stiffness:320, damping:22 }}
            >
              {/* Image (revealed on hover) */}
              <div className="relative h-44 overflow-hidden">
                <img src={svc.img} alt={svc.name}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-700"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050F09]/70 via-transparent to-transparent group-hover:from-[#050F09]/40 transition-all duration-700"/>

                {/* Number overlay */}
                <div className="absolute top-4 left-4 text-5xl font-black text-white transition-colors duration-500 leading-none select-none">
                  {svc.num}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-v2-green/12 border border-v2-green/20 group-hover:bg-v2-green/25 group-hover:border-v2-green/50 transition-all duration-300">
                    <svc.icon size={18} className="text-v2-green"/>
                  </div>
                  <ArrowUpRight size={16} className="text-white/20 group-hover:text-v2-yellow transition-colors duration-300 mt-1.5"/>
                </div>

                {/* Green bar on hover */}
                <div className="h-0.5 rounded-full mb-3 transition-all duration-500"
                  style={{ background:'linear-gradient(to right, #0F7B46, transparent)', width:'0%' }}
                  ref={el => { if (el) { el.style.transition='width 0.5s ease'; } }}
                  onMouseEnter={e => { e.currentTarget.style.width = '100%'; }}
                />

                <h3 className="text-white font-extrabold text-base mb-2 group-hover:text-v2-yellow transition-colors duration-300">{svc.name}</h3>
                <p className="text-white/35 text-xs leading-relaxed group-hover:text-white/55 transition-colors duration-300">{svc.desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
