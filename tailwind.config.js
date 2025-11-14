/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef8f0',
          100: '#fdefd9',
          200: '#fbddb3',
          300: '#f8c583',
          400: '#f5a451',
          500: '#f28b2c',
          600: '#e37021',
          700: '#bc561c',
          800: '#96451d',
          900: '#793b1a',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}