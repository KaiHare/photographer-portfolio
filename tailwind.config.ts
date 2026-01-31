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
        display: ["var(--font-serif)", "\"Noto Serif SC\"", "serif"],
        sans: ["var(--font-sans)", "\"Noto Sans SC\"", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "var(--ink)",
        bone: "var(--paper)",
        muted: "var(--muted)",
        line: "var(--line)",
        "ink-strong": "var(--ink-strong)",
        "accent-1": "var(--accent-1)",
        "accent-2": "var(--accent-2)",
        "accent-3": "var(--accent-3)",
      },
    },
  },
  plugins: [],
};

export default config;
