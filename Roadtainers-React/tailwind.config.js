/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#0F7B46',
          deep: '#065F46',
          yellow: '#FACC15',
          light: '#F8FAFC',
          dark: '#111827',
          gray: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-alt': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float: 'float 3.5s ease-in-out infinite',
        'float-alt': 'float-alt 4s ease-in-out 1.5s infinite',
        'scroll-x': 'scroll-x 22s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #03291E 0%, #065F46 50%, #0F7B46 100%)',
        'card-gradient': 'linear-gradient(135deg, #0F7B46 0%, #065F46 100%)',
        'cta-gradient': 'linear-gradient(135deg, #065F46 0%, #0F7B46 60%, #1a9155 100%)',
      },
      boxShadow: {
        'glow-green': '0 0 30px rgba(15, 123, 70, 0.3)',
        'glow-yellow': '0 0 30px rgba(250, 204, 21, 0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
