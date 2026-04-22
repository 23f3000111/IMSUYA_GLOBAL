const items = [
  'HAIRCUTS', 'PRECISION FADES', 'BEARD DESIGN', 'HAIR COLOURING',
  'SCALP CARE', 'FACE CARE', 'PETALING JAYA', 'KUALA LUMPUR',
  'HAIRCUTS', 'PRECISION FADES', 'BEARD DESIGN', 'HAIR COLOURING',
  'SCALP CARE', 'FACE CARE', 'PETALING JAYA', 'KUALA LUMPUR',
]

const Marquee = () => (
  <div className="bg-void-2 border-y border-white/[0.06] py-5 overflow-hidden select-none">
    <div className="flex marquee-inner whitespace-nowrap">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-5 px-4">
          <span className="font-display tracking-[0.25em] text-sm text-white/40">{item}</span>
          <span className="text-gold/50 text-xs">◆</span>
        </span>
      ))}
    </div>
  </div>
)

export default Marquee
