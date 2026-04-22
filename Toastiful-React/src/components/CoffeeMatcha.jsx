import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CoffeeMatcha() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const leftY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const rightY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <section ref={ref} className="section-pad bg-[#111827] overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#5BC8C1]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
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
              Drinks
            </span>
            <div className="w-8 h-0.5 bg-[#5BC8C1]" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
            Crafted Coffee.
            <span className="block italic text-[#5BC8C1]">Ceremonial Matcha.</span>
          </h2>
          <p className="font-manrope text-lg text-white/50 max-w-xl mx-auto">
            From bold espresso to refreshing Aerocano and premium Niko Neko matcha drinks,
            every cup is made to pair perfectly with your toastie.
          </p>
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          {/* Left tall */}
          <motion.div
            style={{ y: leftY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="group relative h-72 md:h-[480px] rounded-3xl overflow-hidden col-span-1"
          >
            <img
              src="/images/Toastiful_5.jpg"
              alt="Matcha latte"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="font-manrope text-[10px] text-[#5BC8C1] tracking-widest uppercase font-semibold">Ceremonial</span>
              <h3 className="font-playfair text-xl font-bold text-white">Matcha Latte</h3>
            </div>
          </motion.div>

          {/* Center wide */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="group relative h-80 md:h-[560px] rounded-3xl overflow-hidden col-span-1"
          >
            <img
              src="/images/Toastiful_6.jpg"
              alt="Chocolate matcha"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="font-manrope text-[10px] text-[#5BC8C1] tracking-widest uppercase font-semibold">Signature</span>
              <h3 className="font-playfair text-xl font-bold text-white">Chocolate Matcha Latte</h3>
            </div>
          </motion.div>

          {/* Right tall */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="group relative h-72 md:h-[480px] rounded-3xl overflow-hidden col-span-1"
          >
            <img
              src="/images/Toastiful_7.jpg"
              alt="Orange espresso"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="font-manrope text-[10px] text-[#5BC8C1] tracking-widest uppercase font-semibold">Espresso</span>
              <h3 className="font-playfair text-xl font-bold text-white">Orange Espresso</h3>
            </div>
          </motion.div>
        </div>

        {/* Drink highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
        >
          {[
            { icon: '☕', label: 'Bold Espresso', sub: 'From RM 6' },
            { icon: '🍵', label: 'Ceremonial Matcha', sub: 'From RM 8' },
            { icon: '🍊', label: 'Orange Espresso', sub: 'RM 10' },
            { icon: '🥤', label: 'Specialty Sodas', sub: 'From RM 7' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors duration-300"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-manrope font-semibold text-white text-sm">{item.label}</div>
              <div className="font-manrope text-xs text-[#5BC8C1] mt-1">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
