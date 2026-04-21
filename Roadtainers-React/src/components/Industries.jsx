import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Factory, Fuel, ShoppingCart, HardHat, Store,
  ArrowLeftRight, Leaf, Mountain, Zap,
} from 'lucide-react';

const industries = [
  { icon: Factory,       label: 'Manufacturing',   color: '#60A5FA' },
  { icon: Fuel,          label: 'Oil & Gas',        color: '#FB923C' },
  { icon: ShoppingCart,  label: 'FMCG',             color: '#34D399' },
  { icon: HardHat,       label: 'Construction',     color: '#F87171' },
  { icon: Store,         label: 'Retail',            color: '#A78BFA' },
  { icon: ArrowLeftRight,label: 'Import / Export',  color: '#FACC15' },
  { icon: Leaf,          label: 'Agriculture',       color: '#4ADE80' },
  { icon: Mountain,      label: 'Mining',            color: '#94A3B8' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-pad bg-brand-light">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="badge bg-green-100 text-brand-green mb-4">
            <Zap size={12} fill="currentColor" />
            Industries We Serve
          </span>
          <h2 className="heading-lg text-brand-dark mb-4">
            Every Sector.{' '}
            <span className="text-gradient-green">Every Load.</span>
          </h2>
          <p className="text-brand-gray text-lg">
            Whether you move fast-moving consumer goods or heavy mining equipment,
            our fleet is spec'd and ready.
          </p>
        </motion.div>

        {/* Icon grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-4 gap-5"
        >
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center gap-4 text-center cursor-default"
            >
              {/* Icon container */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${ind.color}15` }}
              >
                <ind.icon size={28} style={{ color: ind.color }} />
              </div>
              <span className="font-semibold text-brand-dark text-sm group-hover:text-brand-green transition-colors duration-300">
                {ind.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
