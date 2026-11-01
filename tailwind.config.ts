import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        raised: "var(--raised)",
        hover: "var(--hover)",
        border: "var(--border)",
        text: "var(--text)",
        text2: "var(--text2)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        accentLight: "var(--accent-light)",
        primary: "var(--accent)",
        background: "var(--bg)",
        foreground: "var(--text)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Noto Sans Thai", "Leelawadee UI", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["Cascadia Mono", "Consolas", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "14px",
        control: "10px",
      },
      maxWidth: {
        shell: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
