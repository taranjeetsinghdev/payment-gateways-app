/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0E14",
          900: "#0B0E14",
          800: "#12161F",
          700: "#181D29",
          600: "#232838",
          500: "#333A4D",
        },
        muted: "#828C9E",
        paper: {
          DEFAULT: "#F2EEE2",
          dim: "#E7E1D0",
          ink: "#1E2430",
        },
        signal: {
          teal: "#37D6A7",
          amber: "#F2A93C",
          red: "#EF6F6C",
        },
      },
      fontFamily: {
        display: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.03) inset",
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};

module.exports = config;
