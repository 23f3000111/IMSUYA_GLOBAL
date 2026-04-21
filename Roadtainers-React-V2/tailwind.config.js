/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'v2-green':  '#0F7B46',
        'v2-deep':   '#065F46',
        'v2-yellow': '#FACC15',
        'v2-dark':   '#050F09',
        'v2-ink':    '#0A1A0F',
        'v2-gray':   '#6B7280',
        'v2-light':  '#F8FAFC',
        'v2-text':   '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        drawRoute: {
          from: { strokeDashoffset: '2000' },
          to:   { strokeDashoffset: '0' },
        },
        orbFloat: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(40px,-30px) scale(1.06)' },
          '66%':     { transform: 'translate(-30px,20px) scale(0.95)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        dotPulse: {
          '0%,100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%':     { transform: 'scale(1.5)', opacity: '0.3' },
        },
      },
      animation: {
        'draw':           'drawRoute 3s ease-out forwards',
        'draw-d1':        'drawRoute 3s ease-out 0.4s forwards',
        'draw-d2':        'drawRoute 3s ease-out 0.8s forwards',
        'draw-d3':        'drawRoute 3s ease-out 1.2s forwards',
        'draw-d4':        'drawRoute 3s ease-out 1.6s forwards',
        'orb':            'orbFloat 9s ease-in-out infinite',
        'orb-r':          'orbFloat 12s ease-in-out infinite reverse',
        'fade-up':        'fadeUp 0.6s ease-out forwards',
        'shimmer':        'shimmer 3s linear infinite',
        'dot-pulse':      'dotPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
