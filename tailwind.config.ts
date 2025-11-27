import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      // Example: utilities that use CSS variables for white-label branding
      colors: {
        brand: "rgb(var(--brand-rgb, 15 23 42))",
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
} satisfies Config;
