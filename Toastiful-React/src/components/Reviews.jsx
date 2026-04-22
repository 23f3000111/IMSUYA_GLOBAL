import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Amirah S.',
    avatar: 'A',
    color: '#5BC8C1',
    rating: 5,
    text: 'Best cheese toastie in PJ. The crispy sourdough and melted cheese is next level. Already been back 4 times!',
    date: 'Google Review',
  },
  {
    name: 'Danial R.',
    avatar: 'D',
    color: '#D4A373',
    rating: 5,
    text: 'Hidden gem with amazing coffee. The Aerocano is refreshing and the orange espresso is absolutely unique.',
    date: 'Google Review',
  },
  {
    name: 'Priya K.',
    avatar: 'P',
    color: '#5A3E36',
    rating: 5,
    text: 'Worth the hype. Smoked salmon toastie is elite — creamy, smoky, perfectly pressed. Came for the vibes, stayed for the food.',
    date: 'Google Review',
  },
  {
    name: 'Hafiz M.',
    avatar: 'H',
    color: '#2F9E97',
    rating: 5,
    text: 'My go-to breakfast spot in Damansara. The matcha latte pairs perfectly with the beef pastrami toastie. Absolutely addictive.',
    date: 'Google Review',
  },
  {
    name: 'Siti N.',
    avatar: 'S',
    color: '#D4A373',
    rating: 5,
    text: 'Cozy atmosphere, friendly staff, and the cheese pull on the just-cheese toastie is absolutely satisfying. 10/10 recommend.',
    date: 'Google Review',
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (dir) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => navigate(1), 5500);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  };

  return (
    <section id="reviews" className="section-pad bg-[#FFF8EE] overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-[#5BC8C1]" />
            <span className="font-manrope text-xs text-[#5BC8C1] tracking-[0.25em] uppercase font-semibold">
              Reviews
            </span>
            <div className="w-8 h-0.5 bg-[#5BC8C1]" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#111827] mb-4">
            What People Are Saying.
          </h2>

          {/* Google Rating */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-3 shadow-md mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#D4A373" className="text-[#D4A373]" />
              ))}
            </div>
            <span className="font-playfair font-bold text-2xl text-[#111827]">5.0</span>
            <span className="font-manrope text-sm text-[#6B7280]">100+ Google Reviews</span>
          </div>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full p-10 md:p-14"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(reviews[current].rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#D4A373" className="text-[#D4A373]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-playfair text-xl md:text-2xl xl:text-3xl font-medium text-[#111827] leading-relaxed mb-8 italic">
                  "{reviews[current].text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-playfair font-bold text-lg"
                    style={{ backgroundColor: reviews[current].color }}
                  >
                    {reviews[current].avatar}
                  </div>
                  <div>
                    <div className="font-manrope font-semibold text-[#111827]">
                      {reviews[current].name}
                    </div>
                    <div className="font-manrope text-xs text-[#6B7280]">
                      {reviews[current].date}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-400 ${
                    i === current
                      ? 'w-7 h-2.5 bg-[#5BC8C1]'
                      : 'w-2.5 h-2.5 bg-[#D1FAF8] hover:bg-[#5BC8C1]'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-11 h-11 rounded-full border-2 border-[#5BC8C1] text-[#5BC8C1] flex items-center justify-center hover:bg-[#5BC8C1] hover:text-white transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-11 h-11 rounded-full bg-[#5BC8C1] text-white flex items-center justify-center hover:bg-[#2F9E97] transition-colors duration-300"
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
