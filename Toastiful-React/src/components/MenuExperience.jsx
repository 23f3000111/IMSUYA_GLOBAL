import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['Toasties', 'Espresso', 'Non Coffee', 'Sodas'];

const menu = {
  Toasties: [
    { name: 'Just Cheese', price: 'RM 16', tag: 'Classic' },
    { name: 'Red Onion', price: 'RM 17', tag: 'Simple' },
    { name: 'Chicken Ham', price: 'RM 20', tag: 'Popular' },
    { name: 'Chicken Ham & Pineapple', price: 'RM 21', tag: 'Sweet-Savory' },
    { name: 'Tuna & Red Onion', price: 'RM 21', tag: 'Classic' },
    { name: 'Beef Pastrami, Pickle & Mustard Mayo', price: 'RM 24', tag: 'House Fav ✦' },
    { name: 'Smoked Salmon & Cream Cheese', price: 'RM 28', tag: 'Premium' },
    { name: 'Dark Chocolate', price: 'RM 18', tag: 'Sweet' },
  ],
  Espresso: [
    { name: 'Espresso', price: 'RM 6', tag: 'Bold' },
    { name: 'Black', price: 'RM 6', tag: 'Pure' },
    { name: 'White', price: 'RM 9', tag: 'Smooth' },
    { name: 'Mocha', price: 'RM 11', tag: 'Rich' },
    { name: 'Aerocano', price: 'RM 8', tag: 'Refreshing' },
    { name: 'Orange Espresso', price: 'RM 10', tag: 'Citrus' },
    { name: 'Espresso Tonic', price: 'RM 11', tag: 'Sparkling' },
  ],
  'Non Coffee': [
    { name: 'Premium Tea Selections', price: 'RM 8', tag: 'Classic' },
    { name: 'Swiss Dark Chocolate', price: 'RM 11', tag: 'Indulgent' },
    { name: 'AJISAI — Matcha Tea', price: 'RM 8', tag: 'Ceremonial' },
    { name: 'AJISAI — Matcha Latte', price: 'RM 12', tag: 'Ceremonial ✦' },
    { name: 'TSUBAKI — Houjicha Latte', price: 'RM 11', tag: 'Roasted' },
    { name: 'Houjicha Strawberry Latte', price: 'RM 13', tag: 'Fruity' },
    { name: 'Chocolate Strawberry Latte', price: 'RM 13', tag: 'Sweet' },
    { name: 'Matcha Strawberry Latte', price: 'RM 14', tag: 'Popular' },
    { name: 'Chocolate Matcha Latte', price: 'RM 14', tag: 'Signature' },
  ],
  Sodas: [
    { name: 'Espresso Soda', price: 'RM 7', tag: 'Bold' },
    { name: 'Lemonade Soda', price: 'RM 7', tag: 'Citrus' },
    { name: 'Strawberry Soda', price: 'RM 7', tag: 'Sweet' },
    { name: 'Espresso Lemonade / Strawberry', price: 'RM 9', tag: 'Fusion' },
    { name: 'Matcha Lemonade / Strawberry', price: 'RM 11', tag: 'Premium' },
  ],
};

const tabIcons = {
  Toasties: '🍞',
  Espresso: '☕',
  'Non Coffee': '🍵',
  Sodas: '🥤',
};

export default function MenuExperience() {
  const [active, setActive] = useState('Toasties');

  return (
    <section id="menu" className="section-pad bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-[#5BC8C1]" />
            <span className="font-manrope text-xs text-[#5BC8C1] tracking-[0.25em] uppercase font-semibold">
              The Menu
            </span>
            <div className="w-8 h-0.5 bg-[#5BC8C1]" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#111827] mb-4">
            Every Item Made with Love.
          </h2>
          <p className="font-manrope text-lg text-[#6B7280] max-w-xl mx-auto">
            Sourdough toasties, specialty coffee, ceremonial matcha and refreshing sodas.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2 bg-[#F9FAFB] rounded-full p-1.5 shadow-inner">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-manrope text-sm font-semibold transition-all duration-300 ${
                  active === tab
                    ? 'text-white shadow-lg'
                    : 'text-[#6B7280] hover:text-[#5BC8C1]'
                }`}
              >
                {active === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-[#5BC8C1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tabIcons[tab]}</span>
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {menu[active].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-[#FFF8EE] rounded-2xl p-5 border border-[#E5E7EB] card-lift cursor-default"
              >
                {/* Tag */}
                <span className="inline-block font-manrope text-[10px] font-semibold tracking-widest uppercase text-[#5BC8C1] bg-[#5BC8C1]/10 px-2.5 py-1 rounded-full mb-3">
                  {item.tag}
                </span>

                {/* Name */}
                <h3 className="font-playfair font-semibold text-[#111827] text-base leading-snug mb-3 group-hover:text-[#2F9E97] transition-colors">
                  {item.name}
                </h3>

                {/* Divider */}
                <div className="w-8 h-0.5 bg-[#5BC8C1]/40 mb-3 group-hover:w-16 transition-all duration-500" />

                {/* Price */}
                <div className="font-playfair font-bold text-xl text-[#5BC8C1]">
                  {item.price}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-manrope text-sm text-[#9CA3AF] mt-10"
        >
          All toasties served on thick crispy sourdough • Dine-in & takeaway available
        </motion.p>
      </div>
    </section>
  );
}
