/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    animation: {
      'fade-in': 'fadeIn 0.8s ease-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
  }
},
  plugins: [],
}
