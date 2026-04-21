import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Zap } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Roadtainers has been our go-to transport partner for three years. Their fleet capacity and cross-border knowledge is unmatched in the region.',
    name: 'David Mwangi',
    role: 'Operations Director',
    company: 'East Africa Imports Ltd.',
    industry: 'Import / Export',
    rating: 5,
  },
  {
    quote:
      'Consistent delivery timelines and a professional team that communicates at every stage. Our manufacturing supply chain runs smoothly because of them.',
    name: 'Sarah Otieno',
    role: 'Supply Chain Manager',
    company: 'Nairobi Manufacturing Group',
    industry: 'Manufacturing',
    rating: 5,
  },
  {
    quote:
      'The tanker operations team is excellent. They understand the compliance requirements for fuel logistics and always deliver without compromise.',
    name: 'James Kariuki',
    role: 'Logistics Head',
    company: 'PetroEast Energy',
    industry: 'Oil & Gas',
    rating: 5,
  },
  {
    quote:
      'From low loaders to container haulage, their fleet strength is impressive. They handle our port-to-warehouse movement better than anyone else.',
    name: 'Anne Wanjiku',
    role: 'Port Operations Manager',
    company: 'Coastal Terminal Services',
    industry: 'Port & Shipping',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -50 : 50 }),
  };

  return (
    <section className="section-pad bg-white" ref={ref}>
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="badge bg-green-100 text-brand-green mb-4">
            <Zap size={12} fill="currentColor" />
            Client Stories
          </span>
          <h2 className="heading-lg text-brand-dark mb-4">
            Trusted by{' '}
            <span className="text-gradient-green">Leading Businesses</span>
          </h2>
          <p className="text-brand-gray text-lg">
            Hear from the companies that rely on Roadtainers to keep their supply chains moving.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-brand-light rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-card overflow-hidden min-h-[280px] flex flex-col justify-center">
            {/* Decorative quote mark */}
            <div className="absolute top-6 right-8 opacity-10">
              <Quote size={80} className="text-brand-green" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-brand-yellow" fill="currentColor" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-brand-dark text-lg sm:text-xl leading-relaxed font-medium mb-8">
                  "{testimonials[current].quote}"
                </p>

                {/* Attribution */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-green font-extrabold text-lg">
                      {testimonials[current].name[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-brand-dark">{testimonials[current].name}</div>
                    <div className="text-brand-gray text-sm">{testimonials[current].role}</div>
                    <div className="text-brand-green text-sm font-semibold">{testimonials[current].company}</div>
                  </div>
                  <div className="ml-auto hidden sm:block">
                    <span className="bg-green-100 text-brand-green text-xs font-semibold px-3 py-1.5 rounded-full">
                      {testimonials[current].industry}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 h-2.5 bg-brand-green' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-brand-gray hover:border-brand-green hover:text-brand-green transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-brand-gray hover:border-brand-green hover:text-brand-green transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
