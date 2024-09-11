/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flight: {
          "0%": { transform: "translateX(-50%) translateY(0)" },
          "50%": { transform: "translateX(0%) translateY(-15px)" },
          "100%": { transform: "translateX(50%) translateY(0)" },
        },
      },
      animation: {
        flight: "flight 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
