/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      spacing: {
        18: "64px",
      },
      colors: {
        redwood: "#A45B5B",
        mistyRose: "#FFD8D9",
        salmonPink: "#FF9999",
        caputMortuum: "#481C1C",
        blackBean: "#481C1C",
      },
    },
  },
  plugins: [],
};
