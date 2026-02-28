import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A227",
          soft: "#D4AF37",
          light: "#E8D5A3",
        },
        cream: {
          DEFAULT: "#FFFDF8",
          warm: "#FDF8F0",
          ivory: "#FAF6EE",
        },
        warm: {
          brown: "#6B5B4F",
          "brown-dark": "#4A3F36",
        },
        charcoal: "#2C2419",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        handwritten: ["Dancing Script", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 1.5s ease-out forwards",
        "fade-up": "fadeUp 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
