import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Roadtainers moved our heavy machinery across Uganda without a single delay. Their low loaders and driver expertise are unmatched in East Africa.",
    name:    "James Karimi",
    role:    "Operations Director",
    company: "East Africa Steel",
    industry:"Manufacturing",
    rating:  5,
  },
  {
    quote: "From Mombasa port to our warehouse in Kigali — Roadtainers managed the entire corridor. Real-time tracking gave us full peace of mind throughout.",
    name:    "Sarah Munyua",
    role:    "Supply Chain Manager",
    company: "Rwanda Construction Group",
    industry:"Construction",
    rating:  5,
  },
  {
    quote: "We've trusted Roadtainers for 8 years for our fuel tanker operations across Kenya. Their safety standards and on-time record are simply exceptional.",
    name:    "Ahmed Hassan",
    role:    "Logistics Head",
    company: "PetroLink Africa",
    industry:"Oil & Gas",
    rating:  5,
  },
  {
    quote: "Our container imports from Mombasa reach Kampala faster with Roadtainers than any other carrier. Their customs expertise is a massive bonus.",
    name:    "Grace Ochieng",
    role:    "Import Manager",
    company: "Uganda Traders Ltd",
    industry:"Import / Export",
    rating:  5,
  },
];

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const go = useCallback((next) => {
    setDir(next > idx ? 1 : -1);
    setIdx(((next % total) + total) % total);
  }, [idx, total]);

  const next = useCallback(() => go(idx + 1), [go, idx]);
  const prev = useCallback(() => go(idx - 1), [go, idx]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = TESTIMONIALS[idx];

  return (
    <section id="testimonials" className="sec bg-white relative overflow-hidden">
      {/* Subtle green background blob */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(15,123,70,0.05) 0%, transparent 70%)' }}/>

      <div className="wrap">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-v2 bg-v2-green/10 text-v2-green border border-v2-green/20 mb-5">
            <Star size={12} fill="currentColor"/>
            Client Stories
          </span>
          <h2 className="heading-xl text-v2-text">
            Trusted by Industry{' '}
            <span className="text-grad-green">Leaders.</span>
          </h2>
        </div>

        {/* Testimonial slider */}
        <div className="max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>

          {/* Card */}
          <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-v2-light p-8 lg:p-12 min-h-[280px] flex flex-col justify-between">

            {/* Quote icon */}
            <Quote size={40} className="text-v2-green/15 absolute top-6 left-8"/>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={idx} custom={dir}
                variants={variants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6">

                {/* Stars */}
                <div className="flex gap-1 pt-2">
                  {[...Array(t.rating)].map((_,i)=>( <Star key={i} size={16} className="text-v2-yellow" fill="#FACC15"/> ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-v2-text font-medium leading-relaxed">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
                  <div className="w-11 h-11 rounded-full bg-v2-green flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-v2-text">{t.name}</div>
                    <div className="text-v2-gray text-sm">{t.role} · {t.company}</div>
                  </div>
                  <span className="ml-auto px-3 py-1 rounded-full bg-v2-green/8 border border-v2-green/20 text-v2-green text-xs font-semibold">
                    {t.industry}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_,i)=>(
                <button key={i} onClick={() => go(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width:i===idx?28:8, height:8, backgroundColor:i===idx?'#0F7B46':'#d1d5db' }}
                  aria-label={`Testimonial ${i+1}`}/>
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-v2-green hover:border-v2-green hover:text-white transition-all duration-200 text-v2-gray">
                <ChevronLeft size={18}/>
              </button>
              <button onClick={next}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-v2-green hover:border-v2-green hover:text-white transition-all duration-200 text-v2-gray">
                <ChevronRight size={18}/>
              </button>
            </div>
          </div>
        </div>

        {/* Industry logos row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 opacity-50">
          {['Manufacturing','Construction','Oil & Gas','Import / Export','Agriculture','Mining'].map(ind => (
            <span key={ind}
              className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-v2-gray uppercase tracking-wider">
              {ind}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
