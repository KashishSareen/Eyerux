/** @type {import('tailwindcss').Config} */
// Using CDN – this file is for reference only
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#b22234", dark: "#8b1a2a", light: "#ffe5e9" },
        navy: { DEFAULT: "#0b1e3a", mid: "#1f2a3f", soft: "#3b4b62" },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
};
