/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f3ff",
          100: "#e0dbff",
          500: "#7051ff",
          600: "#5b3dff",
        },
      },
    },
  },
  plugins: [],
};
