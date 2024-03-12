/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange": "#FEB24D",
        "blue": "#22AFAF",
        "gray": "#F3F3F3",
        "black": "#000000"
      },
    },
  },
  plugins: [],
}

