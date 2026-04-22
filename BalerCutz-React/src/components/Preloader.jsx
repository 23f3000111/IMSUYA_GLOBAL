import { motion, AnimatePresence } from 'framer-motion'
import logo from '@img/BalerCutz_logo.jpg'

const Preloader = ({ done }) => {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#08080A] flex flex-col items-center justify-center gap-8"
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Decorative top corners */}
          <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-gold/30" />
          <div className="absolute top-10 right-10 w-12 h-12 border-t border-r border-gold/30" />
          <div className="absolute bottom-10 left-10 w-12 h-12 border-b border-l border-gold/30" />
          <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-gold/30" />

          <motion.img
            src={logo}
            alt="BalrCutz"
            className="h-16 object-contain"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="flex flex-col items-center gap-3">
            <div className="w-32 h-px bg-white/10 overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 1.6, ease: 'easeInOut' }}
              />
            </div>
            <motion.p
              className="section-label text-white/25 tracking-[0.5em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Step In · Level Up
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
