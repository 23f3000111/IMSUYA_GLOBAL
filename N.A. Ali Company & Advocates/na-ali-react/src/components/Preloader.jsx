import { motion, AnimatePresence } from 'framer-motion'

const Preloader = ({ done }) => {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8"
          style={{ background: '#0F172A' }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Decorative gold corners */}
          <div className="absolute top-10 left-10 w-12 h-12" style={{ borderTop: '1px solid rgba(201,162,39,0.3)', borderLeft: '1px solid rgba(201,162,39,0.3)' }} />
          <div className="absolute top-10 right-10 w-12 h-12" style={{ borderTop: '1px solid rgba(201,162,39,0.3)', borderRight: '1px solid rgba(201,162,39,0.3)' }} />
          <div className="absolute bottom-10 left-10 w-12 h-12" style={{ borderBottom: '1px solid rgba(201,162,39,0.3)', borderLeft: '1px solid rgba(201,162,39,0.3)' }} />
          <div className="absolute bottom-10 right-10 w-12 h-12" style={{ borderBottom: '1px solid rgba(201,162,39,0.3)', borderRight: '1px solid rgba(201,162,39,0.3)' }} />

          <motion.img
            src="/N A ALI LOGO.png"
            alt="N.A. Ali & Company Advocates"
            style={{ height: '64px', objectFit: 'contain' }}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="flex flex-col items-center gap-3">
            <div className="relative overflow-hidden" style={{ width: '128px', height: '1px', background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ background: '#C9A227' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 1.6, ease: 'easeInOut' }}
              />
            </div>
            <motion.p
              style={{
                fontFamily: 'Manrope', fontSize: '0.65rem', fontWeight: 700,
                letterSpacing: '0.5em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Legal Clarity · Strategic Results
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
