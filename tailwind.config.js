/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'a1': '#535878',
        'a2': '#9DB0CE',
        'a3': '#B8D8E3',
        'b1': '#CEA0AA',
        'b2': '#E9C2C5',
        'b3': '#FEE1DD'
      }
    },
  },
  plugins: [],
}