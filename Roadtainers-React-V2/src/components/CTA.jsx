import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

export default function CTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="cta" className="relative overflow-hidden py-0">
      {/* Full-width dark green gradient block */}
      <div ref={ref}
        className="relative"
        style={{ background:'linear-gradient(135deg, #020D06 0%, #065F46 50%, #0a2818 100%)' }}>

        {/* Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)' }}/>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle, rgba(15,123,70,0.25) 0%, transparent 70%)' }}/>

        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" preserveAspectRatio="none">
          <defs>
            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="0.8" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)"/>
        </svg>

        <div className="wrap relative z-10 py-24 lg:py-36 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity:0, y:30 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.8, ease:[0.16,1,0.3,1] }}>
            <span className="badge-v2 bg-v2-yellow/15 text-v2-yellow border border-v2-yellow/30 mb-8">
              Ready to Move?
            </span>

            <h2 className="heading-display text-white mb-6 max-w-3xl mx-auto">
              Need Serious<br />
              <span className="shimmer-text">Logistics Support?</span>
            </h2>

            <p className="text-white/45 text-lg lg:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
              Partner with Roadtainers for scalable cargo movement across East Africa. From a single shipment to full fleet contracts.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-16">
              <a href={SITE} target="_blank" rel="noopener noreferrer" className="btn-yellow text-base px-9 py-4 shadow-[0_0_40px_rgba(250,204,21,0.3)]">
                Request a Quote <ArrowRight size={17}/>
              </a>
              <a href={SITE} target="_blank" rel="noopener noreferrer" className="btn-ghost-white text-base px-9 py-4">
                <Phone size={17}/> Contact Our Team
              </a>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14 pt-8 border-t border-white/10">
              {[
                { val:'140+', label:'Fleet Units Ready' },
                { val:'24/7', label:'Operations Support' },
                { val:'98%',  label:'On-Time Delivery'  },
                { val:'8',    label:'Countries Covered'  },
              ].map((s,i)=>(
                <div key={i} className="text-center">
                  <div className="text-2xl font-black text-v2-yellow">{s.val}</div>
                  <div className="text-white/35 text-xs font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
