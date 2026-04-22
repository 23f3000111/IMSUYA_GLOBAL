import { Instagram, MapPin, Facebook } from 'lucide-react';

const col1 = [
  { label: 'Just Cheese — RM16' },
  { label: 'Beef Pastrami — RM24' },
  { label: 'Smoked Salmon — RM28' },
  { label: 'Dark Chocolate — RM18' },
];

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D1117] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-9 h-9 rounded-full bg-[#5BC8C1] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 8C4 6.89 4.89 6 6 6h12a2 2 0 012 2v2H4V8z" fill="white"/>
                  <path d="M4 10h16l-1.5 8H5.5L4 10z" fill="white" fillOpacity="0.7"/>
                </svg>
              </span>
              <span className="font-playfair font-bold text-2xl">Toastiful</span>
            </div>
            <p className="font-manrope text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              Crispy sourdough toasties, specialty coffee and ceremonial matcha
              in the heart of Damansara Uptown.
            </p>
            <a
              href="https://www.instagram.com/toastiful/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#5BC8C1] transition-colors duration-300 rounded-full px-4 py-2 text-sm font-manrope"
            >
              <Instagram size={14} />
              @toastiful
            </a>
            <a
              href="https://www.facebook.com/people/Toastiful/61564941663673/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#1877F2] transition-colors duration-300 rounded-full px-4 py-2 text-sm font-manrope mt-2"
            >
              <Facebook size={14} />
              Facebook
            </a>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-manrope font-semibold text-xs tracking-widest uppercase text-[#5BC8C1] mb-4">
              Menu
            </h4>
            <ul className="space-y-2.5">
              {['Toasties', 'Espresso', 'Non Coffee', 'Sodas'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo('menu')}
                    className="font-manrope text-sm text-white/50 hover:text-[#5BC8C1] transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4 className="font-manrope font-semibold text-xs tracking-widest uppercase text-[#5BC8C1] mb-4">
              Visit
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Story', id: 'about' },
                { label: 'Location', id: 'location' },
                { label: 'Reviews', id: 'reviews' },
                { label: 'Instagram', id: 'gallery' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="font-manrope text-sm text-white/50 hover:text-[#5BC8C1] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-manrope font-semibold text-xs tracking-widest uppercase text-[#5BC8C1] mb-4">
              Hours
            </h4>
            <ul className="space-y-2">
              <li className="font-manrope text-sm text-white/50">Mon – Fri</li>
              <li className="font-manrope text-sm text-white font-semibold">7:30 AM – 3:30 PM</li>
              <li className="font-manrope text-sm text-white/50 mt-3">Saturday</li>
              <li className="font-manrope text-sm text-white font-semibold">9:00 AM – 5:00 PM</li>
              <li className="font-manrope text-sm text-white/50 mt-3">Sunday</li>
              <li className="font-manrope text-sm text-red-400 font-semibold">Closed</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-manrope text-xs text-white/30">
            © 2026 Toastiful. All rights reserved. Damansara Uptown, Petaling Jaya.
          </p>
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-[#5BC8C1]" />
            <span className="font-manrope text-xs text-white/30">
              127, Jalan SS 21/37, Damansara Utama, PJ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
