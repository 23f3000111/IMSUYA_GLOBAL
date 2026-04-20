/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      animation: {
        'float':       'float 7s ease-in-out infinite',
        'float-slow':  'float 11s ease-in-out infinite',
        'float-delay': 'float 9s ease-in-out 2.5s infinite',
        'spin-slow':   'spin 12s linear infinite',
        'glow-pulse':  'glowPulse 2.5s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'marquee':     'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1)' },
          '50%':      { boxShadow: '0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(124,58,237,0.25)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
