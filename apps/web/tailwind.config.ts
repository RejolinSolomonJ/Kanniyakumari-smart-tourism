import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Ocean Blue — Primary brand color
        "ocean": {
          50: "#E8F1F9",
          100: "#C5D9EF",
          200: "#9FC0E4",
          300: "#78A6D9",
          400: "#5B93D0",
          500: "#1A6FBE",
          600: "#0B4F8A",
          700: "#083D6B",
          800: "#052C4E",
          900: "#031B31",
          DEFAULT: "#0B4F8A",
        },
        // Temple Gold — Accent & CTA
        "gold": {
          50: "#FDF8E7",
          100: "#F9ECC5",
          200: "#F5E6B0",
          300: "#EDCF6E",
          400: "#D4AA35",
          500: "#C9981A",
          600: "#A07A14",
          700: "#7A5E10",
          800: "#54410B",
          900: "#2E2406",
          DEFAULT: "#C9981A",
        },
        // Sunset Orange — Warm accent
        "sunset": {
          50: "#FEF0E8",
          100: "#FDDAC5",
          200: "#FBC4A1",
          300: "#F49B5E",
          400: "#EE7A34",
          500: "#E8601C",
          600: "#C44E16",
          700: "#9A3D11",
          800: "#712D0D",
          900: "#471C08",
          DEFAULT: "#E8601C",
        },
        // Granite — Neutral palette
        "granite": {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          DEFAULT: "#4A4A4A",
        },
        // Sea Green — Success / Nature
        "sea": {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          DEFAULT: "#059669",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        tamil: ["Noto Sans Tamil", "Latha", "Tamil MN", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "heading-xl": ["2.5rem", { lineHeight: "1.2" }],
        "heading-lg": ["2rem", { lineHeight: "1.25" }],
        "heading": ["1.5rem", { lineHeight: "1.3" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.35" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.4" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "counter": "counter 2s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 152, 26, 0.4)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(201, 152, 26, 0.1)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      backgroundImage: {
        "gradient-ocean": "linear-gradient(135deg, #0B4F8A 0%, #1A6FBE 50%, #083D6B 100%)",
        "gradient-gold": "linear-gradient(135deg, #C9981A 0%, #D4AA35 50%, #A07A14 100%)",
        "gradient-sunset": "linear-gradient(135deg, #E8601C 0%, #F49B5E 100%)",
        "gradient-hero": "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 100%)",
        "gradient-card": "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        "card": "0 4px 24px 0 rgba(0, 0, 0, 0.08)",
        "card-hover": "0 12px 40px 0 rgba(0, 0, 0, 0.15)",
        "nav": "0 2px 20px 0 rgba(0, 0, 0, 0.08)",
        "gold-glow": "0 4px 30px 0 rgba(201, 152, 26, 0.3)",
        "ocean-glow": "0 4px 30px 0 rgba(11, 79, 138, 0.3)",
      },
      backdropBlur: {
        "xs": "2px",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
export default config;
