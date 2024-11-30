/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: "#22577A",
        secondary: "#38A3A5",
        background: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
