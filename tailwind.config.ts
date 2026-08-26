import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0D18",
        "ink-2": "#14131F",
        "ink-soft": "#44434F",
        muted: "#8A8996",
        cream: "#F5F3EE",
        paper: "#FCFBF8",
        line: "#E7E4DC",
        violet: "#6D4AFF",
        cyanx: "#17C3E6",
        coral: "#FF6B4A",
        lime: "#C6F135",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,13,24,0.04), 0 8px 24px rgba(14,13,24,0.06)",
        lift: "0 12px 40px rgba(14,13,24,0.16)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.6s cubic-bezier(.16,.8,.3,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
