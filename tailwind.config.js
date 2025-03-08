/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#164863',
        secondary: '#427D9D',
        tertiary: '#9BBEC8',
        light: '#DDF2FD',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      },
    },
  },
  plugins: [],
};