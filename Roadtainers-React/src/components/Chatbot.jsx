import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Truck, Phone, Mail } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';
const WHATSAPP = 'https://wa.me/254700000000';

const RESPONSES = {
  greet: {
    triggers: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'start'],
    reply: "Hello! Welcome to **Roadtainers**. I'm your logistics assistant. I can help you with:\n- Getting a quote\n- Our services\n- Fleet information\n- Coverage areas\n- Contact details\n\nWhat can I help you with today?",
  },
  quote: {
    triggers: ['quote', 'price', 'cost', 'rate', 'pricing', 'charges', 'fees', 'how much'],
    reply: "To get an accurate quote, please share:\n- **Cargo type & weight**\n- **Origin and destination**\n- **Required service** (e.g. heavy transport, container)\n\nYou can [**Request a Quote Online**](" + SITE + ") or call our team directly. We respond within 2 hours!",
  },
  services: {
    triggers: ['service', 'services', 'what do you do', 'offer', 'what you offer', 'provide'],
    reply: "We offer **10 core logistics services**:\n\n🚚 Heavy Transport\n📦 Container Haulage\n🏭 Transit Yard Facilities\n🏬 Warehousing\n🛢️ Tanker Services\n🏗️ Cranes & Lifting\n🔄 Local Shunting\n🌍 Cross Border Logistics\n🔧 Fleet Workshop\n📫 General Cargo\n\nWhich service would you like to know more about?",
  },
  fleet: {
    triggers: ['fleet', 'trucks', 'vehicles', 'truck', 'trailer', 'crane', 'tanker', 'loader'],
    reply: "Our **140+ strong fleet** includes:\n\n• **35+** Tractor Heads\n• **30+** Flatbeds\n• **27+** Cargo Trucks\n• **25+** Tankers\n• **15+** Low Loaders (up to 120T)\n• **8+** Cranes (up to 200T)\n\nAll GPS-tracked and maintained in our in-house workshop. [**View Fleet →**](" + SITE + ")",
  },
  coverage: {
    triggers: ['coverage', 'cover', 'country', 'countries', 'where', 'route', 'network', 'kenya', 'uganda', 'tanzania', 'ethiopia', 'sudan', 'rwanda', 'drc', 'burundi'],
    reply: "Roadtainers operates across **8 East African countries**:\n\n🇰🇪 Kenya (HQ - Nairobi & Mombasa)\n🇺🇬 Uganda\n🇹🇿 Tanzania\n🇷🇼 Rwanda\n🇸🇸 South Sudan\n🇪🇹 Ethiopia\n🇨🇩 DRC\n🇧🇮 Burundi\n\nWe specialize in Mombasa port corridor logistics.",
  },
  contact: {
    triggers: ['contact', 'call', 'phone', 'email', 'reach', 'talk', 'speak', 'address', 'office'],
    reply: "You can reach us via:\n\n📞 **+254 700 000 000**\n📧 **info@roadtainers.co.ke**\n🏢 **Nairobi, Kenya**\n\nOr [**visit our website**](" + SITE + ") for the full contact form. We're available **24/7** for urgent dispatch!",
  },
  heavy: {
    triggers: ['heavy', 'abnormal', 'oversized', 'oversize', 'large load', 'big cargo'],
    reply: "Our **Heavy Transport** division handles loads up to **120 tonnes** with:\n\n• Low loaders & hydraulic trailers\n• Escort vehicles & police clearance\n• Route surveys & permits\n• Cross-border authorization\n\n[**Get a Heavy Transport Quote →**](" + SITE + ")",
  },
  container: {
    triggers: ['container', 'haulage', 'port', 'mombasa port', '20ft', '40ft', 'shipping'],
    reply: "Our **Container Haulage** service covers:\n\n• 20ft & 40ft standard/HC containers\n• Direct Mombasa Port collections\n• Inland Container Depots (ICDs)\n• Bonded transit to Uganda, Rwanda & beyond\n\nDoor-to-door or port-to-depot. [**Request Now →**](" + SITE + ")",
  },
  whatsapp: {
    triggers: ['whatsapp', 'chat', 'message', 'wa'],
    reply: "You can reach us on **WhatsApp** for quick responses! Click below to start a chat with our team. We typically respond within minutes during business hours.",
  },
  default: {
    reply: "I'm not sure about that, but our team can help! You can:\n\n• [**Visit our website**](" + SITE + ")\n• Call **+254 700 000 000**\n• Use the form on our site for quotes\n\nIs there anything else I can help you with?",
  },
};

function findResponse(input) {
  const lower = input.toLowerCase().trim();
  for (const key of Object.keys(RESPONSES)) {
    if (key === 'default') continue;
    const { triggers } = RESPONSES[key];
    if (triggers && triggers.some(t => lower.includes(t))) {
      return RESPONSES[key].reply;
    }
  }
  return RESPONSES.default.reply;
}

function formatMessage(text) {
  // Bold **text**
  let formatted = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Links [text](url)
  formatted = formatted.replace(/\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-brand-green font-semibold underline hover:text-brand-deep">$1</a>');
  // Newlines
  formatted = formatted.replace(/\n/g, '<br/>');
  return formatted;
}

const QUICK_ACTIONS = [
  { label: 'Get a Quote', msg: 'I need a quote' },
  { label: 'Our Services', msg: 'What services do you offer?' },
  { label: 'Fleet Info', msg: 'Tell me about your fleet' },
  { label: 'Coverage', msg: 'Which countries do you cover?' },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1, from: 'bot',
      text: "👋 Hello! I'm the **Roadtainers** assistant.\n\nI can help with quotes, services, fleet, and coverage. What would you like to know?",
      ts: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), from: 'user', text: trimmed, ts: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      const reply = findResponse(trimmed);
      setTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1, from: 'bot', text: reply, ts: new Date(),
      }]);
    }, delay);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-brand-green shadow-glow-green flex items-center justify-center border-2 border-white"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={26} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={26} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-brand-green animate-ping opacity-30 pointer-events-none" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed bottom-28 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
            style={{ height: 520 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-green to-brand-deep px-5 py-4 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                <Truck size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm leading-none mb-0.5">Roadtainers Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <span className="text-green-200 text-[11px]">Online · Typically replies instantly</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <X size={16} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.from === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow">
                      <Truck size={13} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
                      ${msg.from === 'user'
                        ? 'bg-brand-green text-white rounded-br-sm'
                        : 'bg-white text-gray-700 border border-gray-100 rounded-bl-sm'
                      }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                  />
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center shadow">
                    <Truck size={13} className="text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 shadow-sm">
                    {[0,1,2].map(i => (
                      <motion.span key={i}
                        className="w-2 h-2 bg-gray-300 rounded-full block"
                        animate={{ y: [0,-5,0] }}
                        transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.18 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick actions */}
            <div className="bg-white border-t border-gray-100 px-4 py-2.5 flex gap-2 overflow-x-auto scrollbar-thin flex-shrink-0">
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  onClick={() => sendMessage(a.msg)}
                  className="whitespace-nowrap text-[11px] font-semibold px-3 py-1.5 rounded-full bg-green-50 text-brand-green border border-green-100 hover:bg-brand-green hover:text-white transition-all duration-200 flex-shrink-0"
                >
                  {a.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your question..."
                maxLength={300}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center shadow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} className="text-white" />
              </motion.button>
            </div>

            {/* Footer links */}
            <div className="bg-white border-t border-gray-50 px-4 py-2 flex items-center justify-center gap-4">
              <a href={"tel:+254700000000"} className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-brand-green transition-colors">
                <Phone size={11} /> Call Us
              </a>
              <span className="text-gray-200">|</span>
              <a href={SITE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-brand-green transition-colors">
                <Mail size={11} /> Website
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
