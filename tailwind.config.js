/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08070d",
        surface: "#0e0d14",
        accent: {
          orange: "#FF5E0E",
          purple: "#8B5CF6",
          violet: "#6366F1",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Impact", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glowOrange: "0 0 35px -5px rgba(255, 94, 14, 0.55), 0 0 15px -3px rgba(255, 94, 14, 0.4)",
        glowPurple: "0 0 50px -10px rgba(139, 92, 246, 0.35)",
        cardGlow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(120, 60, 220, 0.25)",
      },
      backgroundImage: {
        "radial-violet": "radial-gradient(circle at 50% 30%, rgba(99, 45, 160, 0.25) 0%, rgba(18, 12, 35, 0.05) 55%, transparent 75%)",
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
