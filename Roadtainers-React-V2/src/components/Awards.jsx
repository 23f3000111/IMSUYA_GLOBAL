import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award, Globe, Star, ExternalLink } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

const AWARDS = [
  {
    icon: Trophy,
    year: '2010',
    title: 'Road Safety Award',
    body: 'Recognised for outstanding commitment to road safety standards, driver training, and accident-free operations across East African corridors.',
    accent: '#FACC15',
  },
  {
    icon: Globe,
    year: '2010',
    title: '13th International Transport Award',
    sub: 'New Millennium Award — Trade Leaders Club, Madrid',
    body: 'Selected through consultation of 14,000 members across 120 countries as one of the world\'s most deserving transport companies.',
    accent: '#34D399',
  },
  {
    icon: Award,
    year: 'Oct 5, 2010',
    title: 'Gold Medal for Business Excellence',
    sub: 'Founder Mr. Ibrahim Pasta — Madrid, Spain',
    body: 'Presented at the international function in Madrid, Spain, recognising exceptional business leadership and logistics excellence.',
    accent: '#60A5FA',
  },
];

const container = { hidden:{}, visible:{ transition:{ staggerChildren:0.12, delayChildren:0.2 } } };
const awardCard = { hidden:{opacity:0,x:-30}, visible:{opacity:1,x:0,transition:{duration:0.7,ease:[0.16,1,0.3,1]}} };

export default function Awards() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const headRef = useRef(null);
  const headIn  = useInView(headRef, { once:true, margin:'-60px' });

  return (
    <section id="awards" className="sec bg-v2-dark relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 70%)' }}/>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(15,123,70,0.08) 0%, transparent 70%)' }}/>

      <div className="wrap relative z-10">
        {/* Header */}
        <motion.div ref={headRef}
          initial={{opacity:0,y:24}} animate={headIn?{opacity:1,y:0}:{}} transition={{duration:0.7}}
          className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-v2 bg-yellow-400/15 text-v2-yellow border border-yellow-400/25 mb-5">
            <Trophy size={12} fill="currentColor"/>
            Awards & Achievements
          </span>
          <h2 className="heading-xl text-white mb-4">
            Recognised Globally.{' '}
            <span className="text-grad-yellow">Trusted Locally.</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            International recognition for 25 years of excellence in East African transport.
          </p>
        </motion.div>

        {/* Awards timeline */}
        <motion.div ref={ref}
          variants={container} initial="hidden" animate={inView?'visible':'hidden'}
          className="grid lg:grid-cols-3 gap-5 mb-14">
          {AWARDS.map((aw, i) => (
            <motion.div key={i} variants={awardCard}
              className="relative rounded-3xl border border-white/8 overflow-hidden p-7 group hover:border-white/20 transition-all duration-400"
              style={{ background:'rgba(255,255,255,0.03)' }}
              whileHover={{ y:-6, boxShadow:`0 24px 60px ${aw.accent}18` }}
              transition={{ type:'spring', stiffness:260, damping:20 }}>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor:`${aw.accent}60` }}/>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor:`${aw.accent}15`, border:`1.5px solid ${aw.accent}30` }}>
                <aw.icon size={22} style={{ color:aw.accent }}/>
              </div>

              {/* Year */}
              <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 block" style={{ color:`${aw.accent}80` }}>
                {aw.year}
              </span>

              <h3 className="text-white font-extrabold text-lg leading-snug mb-2">{aw.title}</h3>
              {aw.sub && <p className="text-xs font-semibold mb-3" style={{ color:`${aw.accent}90` }}>{aw.sub}</p>}
              <p className="text-white/40 text-sm leading-relaxed">{aw.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote banner */}
        <motion.div
          initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8,delay:0.5}}
          className="rounded-3xl border border-white/10 p-8 lg:p-12"
          style={{ background:'linear-gradient(135deg, rgba(15,123,70,0.12) 0%, rgba(250,204,21,0.05) 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-7">
              {[...Array(5)].map((_,i)=>( <Star key={i} size={18} className="text-v2-yellow" fill="#FACC15"/> ))}
            </div>
            <blockquote className="text-xl lg:text-2xl font-semibold text-white leading-relaxed mb-7 italic">
              "It is a big honour for our company to be recognized after 12 years of hard work and dedication to offering the best transport solution in the country."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-11 h-11 rounded-full bg-v2-green/15 border border-v2-green/30 flex items-center justify-center">
                <Award size={20} className="text-v2-green"/>
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Mr. Yusuf Pasta</p>
                <p className="text-white/40 text-sm">Director, Roadtainers (Mombasa) Ltd</p>
              </div>
            </div>
            <div className="mt-7 pt-6 border-t border-white/10 flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-v2-green"/>
                <span className="text-white/40 text-sm">Trade Leaders Club — 14,000 members in 120 countries</span>
              </div>
              <a href={SITE} target="_blank" rel="noopener noreferrer"
                className="text-v2-yellow text-sm font-bold flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                Learn More <ExternalLink size={12}/>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
