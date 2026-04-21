import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, Route, Truck, PackageCheck, BadgeCheck, Zap } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Request Quote',
    desc: 'Submit your cargo details online or call our 24/7 dispatch team.',
  },
  {
    icon: Route,
    number: '02',
    title: 'Route Planning',
    desc: 'Our team plans the optimal route, permits and border requirements.',
  },
  {
    icon: Truck,
    number: '03',
    title: 'Fleet Dispatch',
    desc: 'The right vehicle is assigned and dispatched from our nearest hub.',
  },
  {
    icon: PackageCheck,
    number: '04',
    title: 'Transit Handling',
    desc: 'Real-time GPS tracking and professional handling throughout transit.',
  },
  {
    icon: BadgeCheck,
    number: '05',
    title: 'Safe Delivery',
    desc: 'Cargo delivered on schedule with full documentation and sign-off.',
  },
];

export default function ProcessTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-pad bg-brand-deep overflow-hidden">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="badge bg-white/10 text-brand-yellow mb-4 border border-white/10">
            <Zap size={12} fill="currentColor" />
            How It Works
          </span>
          <h2 className="heading-lg text-white mb-4">
            From Request to{' '}
            <span className="text-brand-yellow">Delivery</span>
          </h2>
          <p className="text-white/60 text-lg">
            A streamlined 5-step process ensures your cargo moves without friction.
          </p>
        </motion.div>

        {/* Timeline — desktop horizontal, mobile vertical */}
        <div ref={ref} className="relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-white/10">
            <motion.div
              className="h-full bg-brand-yellow origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="relative flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 lg:text-center"
              >
                {/* Mobile vertical connector */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute left-6 top-14 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />
                )}

                {/* Icon circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-brand-green border-2 border-brand-yellow/50 flex items-center justify-center shadow-glow-green lg:mb-5">
                  <step.icon size={22} className="text-white" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-yellow text-brand-deep text-[10px] font-extrabold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] text-brand-yellow font-bold uppercase tracking-wider mb-1 lg:mb-2">
                    Step {step.number}
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-[180px] lg:max-w-none">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
