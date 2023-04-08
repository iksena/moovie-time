/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'moovie-subtitle': '#929292',
        'moovie-background': '#1E232B',
        'moovie-red': '#ff0000',
      },
      borderRadius: {
        large: '32px',
      },
    },
  },
  plugins: [],
};
