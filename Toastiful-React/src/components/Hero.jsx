import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleNav = (section) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#FFF8EE]"
    >
      {/* Background warm gradient blob */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-[#e8f9f8] via-[#f5fdfc] to-transparent" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#5BC8C1] opacity-[0.06] blur-3xl" />
        <div className="absolute top-20 right-1/4 w-64 h-64 rounded-full bg-[#D4A373] opacity-[0.07] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full pt-28 md:pt-0 pb-12 md:pb-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen">
        {/* LEFT: Text */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 flex flex-col items-start"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="inline-flex items-center gap-2 bg-white border border-[#5BC8C1]/30 rounded-full px-4 py-1.5 mb-6 shadow-sm"
          >
            <MapPin size={13} className="text-[#5BC8C1]" />
            <span className="font-manrope text-xs font-semibold text-[#2F9E97] tracking-widest uppercase">
              Hidden Gem in Damansara Uptown
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.35}
            className="font-playfair text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.08] text-[#111827] mb-6"
          >
            Melting
            <span className="block italic text-[#5BC8C1]">Goodness</span>
            in Every Bite.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.5}
            className="font-manrope text-lg text-[#6B7280] leading-relaxed max-w-md mb-8"
          >
            Thick crispy sourdough toasties, four-cheese blends, quality coffee
            and matcha — made for comfort-food lovers.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.65}
            className="flex flex-wrap gap-4 mb-10"
          >
            <button
              onClick={() => handleNav('menu')}
              className="btn-teal flex items-center gap-2"
            >
              View Menu <ArrowRight size={16} />
            </button>
            <button
              onClick={() => handleNav('location')}
              className="btn-outline-teal"
            >
              Visit Us
            </button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.8}
            className="flex items-center gap-5 flex-wrap"
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#D4A373" className="text-[#D4A373]" />
              ))}
              <span className="font-manrope font-bold text-sm text-[#111827] ml-1">5.0</span>
            </div>
            <span className="text-[#D4A373]">✦</span>
            <span className="font-manrope text-sm text-[#6B7280]">100+ Reviews</span>
            <span className="text-[#D4A373]">✦</span>
            <span className="font-manrope text-sm text-[#6B7280]">Breakfast & Lunch Fav</span>
          </motion.div>
        </motion.div>

        {/* RIGHT: Image collage */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          {/* Main hero image */}
          <motion.div
            style={{ y: imgY }}
            className="relative w-72 h-96 md:w-80 md:h-[480px] xl:w-96 xl:h-[560px] rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18)]"
          >
            <img
              src="/images/Toastiful_2.jpg"
              alt="Signature toastie"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5A3E36]/30 via-transparent to-transparent" />
          </motion.div>

          {/* Floating card: coffee cup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-4 md:-left-10 top-1/4 w-40 md:w-48 h-52 md:h-60 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.16)] border-4 border-white float-slow"
          >
            <img
              src="/images/Toastiful_5.jpg"
              alt="Matcha latte"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating card: orange espresso */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-2 md:-right-6 bottom-16 w-32 md:w-36 h-44 md:h-48 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.14)] border-4 border-white"
            style={{ animationDelay: '2s' }}
          >
            <img
              src="/images/Toastiful_7.jpg"
              alt="Orange espresso"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4, type: 'spring', stiffness: 200 }}
            className="absolute top-4 right-4 md:top-8 md:right-0 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2"
          >
            <span className="text-2xl font-playfair font-bold text-[#111827]">5.0</span>
            <div className="flex flex-col">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="#D4A373" className="text-[#D4A373]" />
                ))}
              </div>
              <span className="font-manrope text-[10px] text-[#6B7280]">Google Rating</span>
            </div>
          </motion.div>

          {/* Decorative teal ring */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full border-[24px] border-[#5BC8C1]/15 pointer-events-none" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-manrope text-xs text-[#6B7280] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-[#5BC8C1] to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
