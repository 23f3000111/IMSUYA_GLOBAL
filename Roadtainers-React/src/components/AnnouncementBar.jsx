import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const items = [
  '24/7 Operations',
  'Regional Coverage Across East Africa',
  'Trusted Since 1998',
  'Request a Quote Today',
  'GPS-Tracked Fleet',
  '140+ Fleet Assets',
  'Cross-Border Logistics',
  '98% On-Time Delivery',
];

const doubled = [...items, ...items];

const SITE = 'https://www.roadtainers.co.ke/';

export default function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fn = () => setHidden(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-brand-deep border-b border-white/10 overflow-hidden transition-transform duration-400"
      style={{ height: '40px', transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      {/* gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-brand-deep to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-brand-deep to-transparent z-10 pointer-events-none" />

      <a href={SITE} target="_blank" rel="noopener noreferrer"
         className="flex items-center h-full cursor-pointer">
        <div className="animate-marquee whitespace-nowrap flex items-center h-full">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-8 text-xs font-medium text-white/80 hover:text-white transition-colors"
            >
              <Zap size={10} className="text-brand-yellow flex-shrink-0" fill="currentColor" />
              {item}
            </span>
          ))}
        </div>
      </a>
    </div>
  );
}
