/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teselar': '#083C58',
        'teselar-light': '#052638',
        'innovacion': '#00BFA5',
        'claridad': '#FFFFFF',
        'gris-claro': '#F4F7F9'
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
