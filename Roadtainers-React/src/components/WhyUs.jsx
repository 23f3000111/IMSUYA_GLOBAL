import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Award, Navigation, Users, Shield, Zap, Layers, Map, DollarSign,
} from 'lucide-react';

const features = [
  {
    icon: Award,
    title: '25+ Years Experience',
    desc: "Over two decades of operating in East Africa's most demanding logistics environments.",
    accent: '#FACC15',
  },
  {
    icon: Navigation,
    title: 'GPS-Tracked Fleet',
    desc: 'Every vehicle tracked in real-time. Full cargo visibility from dispatch to delivery.',
    accent: '#60A5FA',
  },
  {
    icon: Users,
    title: 'Skilled Drivers',
    desc: 'Trained, licensed and experienced drivers for local, long-haul and cross-border routes.',
    accent: '#34D399',
  },
  {
    icon: Shield,
    title: 'Safety First',
    desc: 'ISO-compliant safety protocols, regular vehicle inspections and full cargo insurance.',
    accent: '#F87171',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    desc: 'Rapid dispatch and efficient loading processes minimise your supply chain downtime.',
    accent: '#FB923C',
  },
  {
    icon: Layers,
    title: 'Large Capacity Fleet',
    desc: 'Enough assets to scale up at short notice — no bottlenecks, no delays.',
    accent: '#A78BFA',
  },
  {
    icon: Map,
    title: 'Regional Expertise',
    desc: 'Deep knowledge of cross-border regulations, routes and customs requirements.',
    accent: '#0F7B46',
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    desc: 'Premium service at transparent, market-competitive rates with no hidden costs.',
    accent: '#FACC15',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why-us" className="section-pad bg-white">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-12 items-end mb-16"
        >
          <div>
            <span className="badge bg-green-100 text-brand-green mb-4">
              <Zap size={12} fill="currentColor" />
              Why Roadtainers
            </span>
            <h2 className="heading-lg text-brand-dark">
              The Trusted Choice for{' '}
              <span className="text-gradient-green">Serious Logistics</span>
            </h2>
          </div>
          <p className="text-brand-gray text-lg leading-relaxed lg:text-right">
            When cargo can't afford to fail, businesses across East Africa rely on
            Roadtainers for the fleet, the expertise and the commitment to deliver.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group bg-brand-light rounded-2xl p-6 border border-gray-100 hover:border-brand-green/30 hover:shadow-glow-green hover:-translate-y-1.5 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 w-14 h-14"
                style={{ backgroundColor: `${f.accent}15` }}
              >
                <f.icon size={24} style={{ color: f.accent }} />
              </div>
              <h3 className="font-bold text-brand-dark text-base mb-2 group-hover:text-brand-green transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
