import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Truck, Package, Warehouse, Globe, Droplets, ArrowUpDown,
  RotateCcw, Wrench, Box, ArrowRight, Zap,
} from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

// Image mapping for service cards
const serviceImages = {
  'Heavy Transport':          '/images/Transport.jpg',
  'Container Haulage':        '/images/Tractor Trailers.jpg',
  'Transit Yard Facilities':  '/images/Transit Facilities.jpg',
  'Warehousing':              '/images/Centralized Facilities.jpg',
  'Tanker Services':          '/images/Safe & Smooth Movement.jpg',
  'Cranes & Lifting':         '/images/Lifting Facilities.jpg',
  'Local Shunting':           '/images/Transport.jpg',
  'Cross Border Logistics':   '/images/Roadtainers_network.jpg',
  'Fleet Workshop':           '/images/Workshop.jpg',
  'General Cargo':            '/images/General Cargo.jpg',
};

const services = [
  {
    icon: Truck,
    title: 'Heavy Transport',
    desc: 'Oversized and abnormal loads moved safely across all road types with specialized trailers.',
    color: '#0F7B46',
  },
  {
    icon: Package,
    title: 'Container Haulage',
    desc: '20ft and 40ft container logistics from port to inland destinations across East Africa.',
    color: '#065F46',
  },
  {
    icon: Warehouse,
    title: 'Transit Yard Facilities',
    desc: 'Secure off-dock container and cargo storage with 24/7 surveillance and management.',
    color: '#0F7B46',
  },
  {
    icon: Box,
    title: 'Warehousing',
    desc: 'Short and long-term warehousing solutions with inventory management services.',
    color: '#065F46',
  },
  {
    icon: Droplets,
    title: 'Tanker Services',
    desc: 'Bulk liquid transport including fuel, water and industrial liquids in certified tankers.',
    color: '#0F7B46',
  },
  {
    icon: ArrowUpDown,
    title: 'Cranes & Lifting',
    desc: 'Heavy equipment lifting and placement with our range of mobile and crawler cranes.',
    color: '#065F46',
  },
  {
    icon: RotateCcw,
    title: 'Local Shunting',
    desc: 'Container and trailer repositioning services within port and industrial zones.',
    color: '#0F7B46',
  },
  {
    icon: Globe,
    title: 'Cross Border Logistics',
    desc: 'Seamless cargo movement across Uganda, Tanzania, Rwanda, DRC, South Sudan and Ethiopia.',
    color: '#065F46',
  },
  {
    icon: Wrench,
    title: 'Fleet Workshop',
    desc: 'In-house vehicle maintenance and repair ensuring maximum uptime across our fleet.',
    color: '#0F7B46',
  },
  {
    icon: Box,
    title: 'General Cargo',
    desc: 'Reliable point-to-point delivery for consolidated and break-bulk cargo across the region.',
    color: '#065F46',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="section-pad bg-brand-light">
      <div className="container-xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge bg-green-100 text-brand-green mb-4">
            <Zap size={12} fill="currentColor" />
            Our Services
          </span>
          <h2 className="heading-lg text-brand-dark mb-5">
            Complete Logistics{' '}
            <span className="text-gradient-green">Solutions</span>
          </h2>
          <p className="text-brand-gray text-lg leading-relaxed">
            From port to warehouse, light cargo to 120-tonne abnormal loads — we have the fleet,
            expertise and infrastructure to handle it all.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={card}
              whileHover={{
                y: -16,
                scale: 1.03,
                boxShadow: '0 28px 60px rgba(15,123,70,0.18), 0 8px 20px rgba(0,0,0,0.1)',
                transition: { type: 'spring', stiffness: 320, damping: 18 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-card cursor-pointer overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image reveal on hover */}
              <div className="relative overflow-hidden h-36">
                <img
                  src={serviceImages[service.title] || '/images/Transport.jpg'}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/30 to-transparent" />
                {/* Icon on image */}
                <div className="absolute bottom-3 left-4">
                  <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center shadow-glow-yellow">
                    <service.icon size={20} className="text-brand-deep" />
                  </div>
                </div>
                {/* Number badge */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">{String(i+1).padStart(2,'0')}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Animated green line */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-brand-green to-brand-yellow rounded-full mb-3"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  style={{ transformOrigin: 'left' }}
                />

                {/* Title */}
                <h3 className="font-bold text-brand-dark text-[0.9rem] mb-2 leading-tight group-hover:text-brand-green transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Desc */}
                <p className="text-brand-gray text-xs leading-relaxed mb-4">
                  {service.desc}
                </p>

                {/* Arrow */}
                <a
                  href={SITE} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green group-hover:text-brand-deep transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn more
                  <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </div>

              {/* Bottom glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green to-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
