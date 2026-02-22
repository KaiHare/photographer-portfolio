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
        display: ["var(--font-display)", "var(--font-serif)", "\"Noto Serif SC\"", "serif"],
        sans: ["var(--font-sans)", "\"Noto Sans SC\"", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "var(--ink)",
        bone: "var(--paper)",
        muted: "var(--muted)",
        line: "var(--line)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        "accent-warm": "var(--accent-warm)",
        "accent-cold": "var(--accent-cold)",
        "accent-earth": "var(--accent-earth)",
        "ink-strong": "var(--ink-strong)",
      },
    },
  },
  plugins: [],
};

export default config;
