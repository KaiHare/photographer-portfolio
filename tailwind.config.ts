import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["\"Fraunces\"", "serif"],
        sans: ["\"Manrope\"", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0f0f0c",
        bone: "#f5f1ea",
        sand: "#e7dbc8",
        clay: "#c58f6a",
      },
    },
  },
  plugins: [],
};

export default config;
