/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange": {
          "100": "#FEB24D",
          "200": "#FEA634",
        },
        "blue": "#22AFAF",
        "blue-dark": "#1D7A7A",
        "gray": "#ECECEC",
        "gray-dark": "#BDBDBD",
        "black": "#141414",
        "white": "#F3F3F3"
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}

