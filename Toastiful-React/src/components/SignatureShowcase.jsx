import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   WHY THIS LAYOUT WORKS:
   • The outer <section> is position:relative, no overflow set
     (overflow:hidden on any ancestor KILLS position:sticky)
   • We use a plain flex container (lg:flex) with items-start
     so the LEFT child does NOT stretch to row height — that
     lets the browser respect position:sticky on its inner div
   • LEFT sticky div: top=[announcement+navbar height ≈ 90px],
     height = 100vh-90px  → stays locked in viewport while
     the RIGHT column scrolls past it
   • RIGHT column: section header + 5 full-viewport steps
   • IntersectionObserver fires when each step crosses 40% of
     viewport → updates activeIndex → crossfade images swap
──────────────────────────────────────────────────────────── */

const toasties = [
  {
    id: 1,
    name: 'Beef Pastrami, Pickle & Mustard Mayo',
    tag: 'House Favorite',
    desc: 'Savory, rich and utterly addictive. Tender pastrami layered with tangy pickles and our signature mustard mayo on golden sourdough.',
    price: 'RM 24',
    img: '/images/Toastiful_2.jpg',
    color: '#5A3E36',
  },
  {
    id: 2,
    name: 'Smoked Salmon & Cream Cheese',
    tag: 'Premium Pick',
    desc: 'Elegantly creamy with a delicate smoke. Cold-smoked salmon on whipped cream cheese — simple, luxurious, unforgettable.',
    price: 'RM 28',
    img: '/images/Toastiful_1.jpg',
    color: '#2F9E97',
  },
  {
    id: 3,
    name: 'Chicken Ham & Pineapple',
    tag: 'Sweet-Salty Comfort',
    desc: 'The sweet-salty combo that divides opinion but wins hearts. Juicy chicken ham meets caramelized pineapple in a crispy sourdough hug.',
    price: 'RM 21',
    img: '/images/Toastiful_3.jpg',
    color: '#D4A373',
  },
  {
    id: 4,
    name: 'Tuna & Red Onion',
    tag: 'Classic Done Right',
    desc: 'Classic never tasted this good. Premium tuna flakes with sharp red onion — perfectly seasoned, perfectly toasted.',
    price: 'RM 21',
    img: '/images/Toastiful_1.jpg',
    color: '#5BC8C1',
  },
  {
    id: 5,
    name: 'Dark Chocolate',
    tag: 'Sweet Indulgence',
    desc: 'Molten dark chocolate between crispy sourdough layers. A dessert toast for those who believe chocolate is always the answer.',
    price: 'RM 18',
    img: '/images/Toastiful_2.jpg',
    color: '#5A3E36',
  },
];

export default function SignatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.4, rootMargin: '-20% 0px -20% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    /*
      CRITICAL: No overflow:hidden on <section> or the flex wrapper.
      overflow:hidden on any ancestor breaks position:sticky entirely.
    */
    <section id="story" className="bg-[#111827]">

      {/* ── Flex container (items-stretch = default) so the left child
             stretches to full section height, giving the inner sticky div
             a tall parent to stick within. ── */}
      <div className="lg:flex">

        {/* ══ LEFT — sticky image panel (desktop only) ══ */}
        {/* The flex child itself is NOT sticky — it stretches to full section height.
            The INNER div carries position:sticky so it has a tall parent to stick within. */}
        <div className="hidden lg:block lg:w-1/2">
          <div
            style={{ position: 'sticky', top: '90px', height: 'calc(100vh - 90px)' }}
            className="flex flex-col p-8 justify-center"
          >
            {/* Section label inside the sticky panel */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-[#5BC8C1]" />
              <span className="font-manrope text-xs text-[#5BC8C1] tracking-[0.25em] uppercase font-semibold">
                Signature Toasties
              </span>
            </div>

            {/* Image frame */}
            <div className="relative flex-1 rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
              {/* All images stacked — crossfade via opacity, no black gap */}
              {toasties.map((item, i) => (
                <motion.img
                  key={item.id}
                  src={item.img}
                  alt={item.name}
                  animate={{
                    opacity: i === activeIndex ? 1 : 0,
                    scale:   i === activeIndex ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ zIndex: i === activeIndex ? 2 : 1 }}
                />
              ))}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                style={{ zIndex: 3 }}
              />

              {/* Price — crossfade per toastie */}
              <div className="absolute bottom-7 left-7" style={{ zIndex: 4 }}>
                {toasties.map((item, i) => (
                  <motion.span
                    key={item.id}
                    animate={{
                      opacity: i === activeIndex ? 1 : 0,
                      y:       i === activeIndex ? 0 : 10,
                    }}
                    transition={{ duration: 0.4 }}
                    className="block font-playfair text-4xl font-bold text-white absolute bottom-0 left-0 whitespace-nowrap"
                  >
                    {item.price}
                  </motion.span>
                ))}
                {/* invisible spacer keeps container height */}
                <span className="invisible font-playfair text-4xl font-bold">RM 00</span>
              </div>

              {/* Progress indicator dots */}
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2"
                style={{ zIndex: 4 }}
              >
                {toasties.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? 'w-1.5 h-8 bg-[#5BC8C1]'
                        : 'w-1.5 h-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ RIGHT — scrolling steps ══ */}
        <div className="lg:w-1/2">
          {/* Mobile-only section header */}
          <div className="lg:hidden px-6 pt-20 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-[#5BC8C1]" />
              <span className="font-manrope text-xs text-[#5BC8C1] tracking-[0.25em] uppercase font-semibold">
                Signature Toasties
              </span>
            </div>
            <h2 className="font-playfair text-4xl font-bold text-white">
              Crafted to <span className="italic text-[#5BC8C1]">Perfection.</span>
            </h2>
          </div>

          {/* One step per toastie — each occupies a full viewport height */}
          {toasties.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (stepRefs.current[i] = el)}
              className="min-h-screen flex flex-col justify-center px-8 md:px-12 lg:px-14 py-24"
            >
              {/* Mobile image */}
              <div className="lg:hidden w-full h-56 rounded-2xl overflow-hidden mb-8 shadow-xl">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Step number */}
              <span className="font-playfair text-[7rem] font-bold leading-none text-white/20 block mb-2 select-none">
                0{i + 1}
              </span>

              {/* Tag */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-0.5 bg-[#5BC8C1]" />
                <span className="font-manrope text-xs font-semibold tracking-widest uppercase text-[#5BC8C1]">
                  {item.tag}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-playfair text-3xl md:text-4xl xl:text-[2.75rem] font-bold text-white leading-tight mb-5">
                {item.name}
              </h3>

              {/* Description */}
              <p className="font-manrope text-lg text-white/55 leading-relaxed max-w-sm mb-8">
                {item.desc}
              </p>

              {/* Mobile price */}
              <div className="lg:hidden font-playfair text-3xl font-bold text-[#5BC8C1] mb-6">
                {item.price}
              </div>

              {/* CTA link */}
              <button
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-[#5BC8C1] font-manrope font-semibold text-sm uppercase tracking-widest group w-fit"
              >
                See Full Menu
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

