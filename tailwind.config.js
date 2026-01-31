/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          mint: '#B6FCD5',
          aqua: '#AFEEEE',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}