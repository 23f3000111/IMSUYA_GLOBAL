/* AnnouncementBar */
import { useEffect, useRef } from 'react';

const items = [
  'Open Weekdays 7:30 AM – 3:30 PM',
  'Saturday 9 AM – 5 PM',
  'Closed Sunday',
  'Damansara Uptown, Petaling Jaya',
  'Crispy Sourdough Toasties',
  'Quality Coffee & Matcha',
  'Open Weekdays 7:30 AM – 3:30 PM',
  'Saturday 9 AM – 5 PM',
  'Closed Sunday',
  'Damansara Uptown, Petaling Jaya',
  'Crispy Sourdough Toasties',
  'Quality Coffee & Matcha',
];

const dot = (
  <span className="mx-4 text-[#5BC8C1] select-none">✦</span>
);

export default function AnnouncementBar() {
  return (
    <div className="bg-[#111827] text-white text-xs font-manrope tracking-widest overflow-hidden py-2.5 fixed top-0 left-0 right-0 w-full z-50">
      <div className="ticker">
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="uppercase">{item}</span>
            {dot}
          </span>
        ))}
        {/* duplicate for seamless loop */}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="flex items-center shrink-0">
            <span className="uppercase">{item}</span>
            {dot}
          </span>
        ))}
      </div>
    </div>
  );
}
