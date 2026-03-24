/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bocra-blue': '#002B7F',
        'bocra-blue-light': '#1a4a9e',
        'bocra-blue-dark': '#001f5c',
        'turquoise': '#2DD4BF',
        'turquoise-light': '#5eead4',
        'turquoise-dark': '#14b8a6',
        'orange': '#F97316',
        'orange-light': '#fb923c',
        'orange-dark': '#ea580c',
        // Sector brand colours
        'sector-telecom': '#0057A8',
        'sector-telecom-light': '#1a6fc4',
        'sector-broadcast': '#D4A017',
        'sector-broadcast-light': '#F5C842',
        'sector-internet': '#006400',
        'sector-internet-light': '#008000',
        'sector-postal': '#8B0000',
        'sector-postal-light': '#a30000',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
