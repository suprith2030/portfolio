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
        obsidian: "#050814",
        "neon-cyan": "#00f3ff",
        "electric-blue": "#0066ff",
        "deep-blue": "#0a1628",
        "panel-bg": "rgba(5, 8, 20, 0.7)",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "grid-fade": "gridFade 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        gridFade: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
      boxShadow: {
        neon: "0 0 15px rgba(0, 243, 255, 0.3), 0 0 30px rgba(0, 243, 255, 0.1)",
        "neon-strong": "0 0 20px rgba(0, 243, 255, 0.5), 0 0 40px rgba(0, 243, 255, 0.2)",
        "neon-glow": "0 0 30px rgba(0, 243, 255, 0.4), 0 0 60px rgba(0, 243, 255, 0.15), inset 0 0 30px rgba(0, 243, 255, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
