import { MapPin, Phone, Mail, ArrowUpRight, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

const LINKS = {
  Company: [
    { label:'About Us',     href:SITE },
    { label:'Our Fleet',    href:SITE },
    { label:'Awards',       href:`${SITE}awards/` },
    { label:'Careers',      href:SITE },
  ],
  Services: [
    { label:'Heavy Transport',   href:SITE },
    { label:'Container Haulage', href:SITE },
    { label:'Tanker Services',   href:SITE },
    { label:'Crane Services',    href:SITE },
  ],
  Network: [
    { label:'Kenya',    href:SITE },
    { label:'Uganda',   href:SITE },
    { label:'Tanzania', href:SITE },
    { label:'Rwanda',   href:SITE },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-v2-dark border-t border-white/8">
      <div className="wrap py-16 lg:py-20">
        {/* Top row */}
        <div className="grid lg:grid-cols-5 gap-10 pb-12 border-b border-white/8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="inline-block rounded-xl overflow-hidden bg-white/90 px-2 py-1 mb-5">
              <img src="/images/Roadtainers_logo.jpg" alt="Roadtainers"
                className="h-8 w-auto object-contain block"/>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-xs">
              Roadtainers (Mombasa) Ltd — East Africa's most trusted heavy transport and logistics operator since 1998.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              {[
                { icon:MapPin, text:'Mombasa, Kenya — East Africa' },
                { icon:Phone,  text:'+254 (0) 41 229 0000' },
                { icon:Mail,   text:'info@roadtainers.co.ke' },
              ].map((c,i)=>(
                <div key={i} className="flex items-center gap-3">
                  <c.icon size={13} className="text-v2-green flex-shrink-0"/>
                  <span className="text-white/40 text-sm">{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([cat, items]) => (
            <div key={cat}>
              <p className="text-white/25 text-[10px] font-black uppercase tracking-[0.15em] mb-4">{cat}</p>
              <ul className="space-y-3">
                {items.map(l=>(
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer"
                      className="text-white/45 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                      {l.label}
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Roadtainers (Mombasa) Ltd. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon:Linkedin,  label:'LinkedIn'  },
              { icon:Twitter,   label:'Twitter'   },
              { icon:Facebook,  label:'Facebook'  },
              { icon:Instagram, label:'Instagram' },
            ].map(s=>(
              <a key={s.label} href={SITE} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-v2-green hover:bg-v2-green/15 transition-all duration-200">
                <s.icon size={14}/>
              </a>
            ))}
          </div>

          {/* CTA */}
          <a href={SITE} target="_blank" rel="noopener noreferrer"
            className="btn-yellow text-xs px-5 py-2.5">
            Get a Quote <ArrowUpRight size={13}/>
          </a>
        </div>
      </div>
    </footer>
  );
}
