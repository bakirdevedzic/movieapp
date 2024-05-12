/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        "primary-black": "#1D2024",
        "primary-gray": "#666666",
        "primary-orange": "#f2784b",
        "primary-orange-2": "#ff9470",
        "primary-white-2": "#ebf0f4",
      },
      height: {
        screen: "100dvh",
      },
      screens: {
        // "2xl": { min: "1381px" },
        xl: { max: "1380px" },
        md: { min: "901px", max: "1200px" },
        sm: { max: "900px" },
        us: { max: "600px" },
      },
    },
  },
  plugins: [],
};
