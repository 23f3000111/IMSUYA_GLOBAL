/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          primary: '#5BC8C1',
          deep:    '#2F9E97',
        },
        cream:  '#FFF8EE',
        coffee: '#5A3E36',
        gold:   '#D4A373',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        manrope:  ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FFF8EE 0%, #fff 60%, #f0fafa 100%)',
      },
    },
  },
  plugins: [],
}
