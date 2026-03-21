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
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
