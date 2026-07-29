/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wedrink: {
          teal: '#00A896',
          'teal-dark': '#008075',
          'teal-light': '#E0F4F1',
          'teal-ultra': '#F0F9F8',
          mint: '#8CE3D2',
          pink: '#FF6B8B',
          'pink-hover': '#FF477E',
          'pink-light': '#FFEBF0',
          yellow: '#FFD166',
          dark: '#112523',
          gray: '#5A6B68'
        }
      },
      fontFamily: {
        fredoka: ['var(--font-fredoka)', 'cursive', 'sans-serif'],
        sans: ['var(--font-outfit)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'cute': '0 10px 25px -5px rgba(0, 168, 150, 0.25)',
        'cute-lg': '0 20px 35px -10px rgba(0, 168, 150, 0.35)',
        'pink-glow': '0 10px 25px -5px rgba(255, 107, 139, 0.35)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
