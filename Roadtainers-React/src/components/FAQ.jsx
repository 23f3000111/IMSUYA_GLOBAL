import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, HelpCircle, Zap } from 'lucide-react';

const faqs = [
  {
    q: 'How quickly can you dispatch a vehicle?',
    a: 'For standard cargo, we can dispatch within 4–8 hours of confirmed booking. Specialized equipment like cranes or low loaders may require 24–48 hours depending on availability and route permits. Our 24/7 dispatch team can advise on exact timelines.',
  },
  {
    q: 'Do you handle cross-border cargo to all East African countries?',
    a: 'Yes. We operate across Kenya, Uganda, Tanzania, Rwanda, Burundi, DRC, South Sudan and Ethiopia. Our team manages all cross-border paperwork, customs clearance documentation and transit permits to ensure smooth passage at every border.',
  },
  {
    q: 'Can we request a custom quote for our specific cargo?',
    a: 'Absolutely. Every cargo is different and pricing depends on weight, dimensions, route, type of equipment required and urgency. Contact our team with your cargo details and we will provide a competitive, itemised quote within hours.',
  },
  {
    q: 'Do you offer GPS fleet tracking for our shipments?',
    a: 'Yes. Every vehicle in our fleet is equipped with GPS tracking. Clients can request real-time status updates on their cargo from our operations team throughout the journey.',
  },
  {
    q: 'What types of cargo do you specialise in?',
    a: 'We handle heavy and abnormal loads, containerised cargo, fuel and liquid tankers, construction equipment, general cargo and project logistics. If it needs to move across East Africa, we have the right equipment for it.',
  },
  {
    q: 'Do you have in-house vehicle maintenance?',
    a: 'Yes. Our fleet workshop handles all scheduled maintenance and emergency repairs. This means less downtime and greater reliability for every shipment we handle.',
  },
];

function FAQItem({ faq, index, open, onToggle }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
      open ? 'border-brand-green/40 shadow-glow-green' : 'border-gray-100'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold transition-colors duration-300 ${
            open ? 'bg-brand-green text-white' : 'bg-green-50 text-brand-green'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <span className={`font-semibold text-base leading-tight transition-colors duration-300 ${
            open ? 'text-brand-green' : 'text-brand-dark group-hover:text-brand-green'
          }`}>
            {faq.q}
          </span>
        </div>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-brand-gray transition-transform duration-300 ${open ? 'rotate-180 text-brand-green' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 pt-0 pl-[4.5rem]">
              <p className="text-brand-gray leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="section-pad bg-brand-light">
      <div className="container-xl">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16" ref={ref}>
          {/* Left header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col justify-start"
          >
            <span className="badge bg-green-100 text-brand-green mb-4 self-start">
              <HelpCircle size={12} />
              FAQs
            </span>
            <h2 className="heading-lg text-brand-dark mb-6">
              Frequently Asked{' '}
              <span className="text-gradient-green">Questions</span>
            </h2>
            <p className="text-brand-gray text-lg leading-relaxed mb-8">
              Everything you need to know about working with Roadtainers.
              Don't see your answer? Our team is available 24/7.
            </p>
            <a
              href="#contact"
              className="btn-primary self-start text-sm shine-btn"
            >
              Talk to Our Team
            </a>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3 flex flex-col gap-3"
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
