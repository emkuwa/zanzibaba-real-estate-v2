import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A2E73",
          heading: "#0B2A6B",
          deep: "#07245A",
        },
        gold: {
          DEFAULT: "#C89B3C",
          light: "#D4AD5C",
        },
        ink: "#0F172A",
        body: "#374151",
        muted: "#64748B",
        surface: "#F8FAFC",
        sand: {
          DEFAULT: "#E8DFD0",
          light: "#F5F0E8",
        },
        border: "#E2E8F0",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        luxury: "1.125rem",
        "luxury-lg": "1.5rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(10, 46, 115, 0.06), 0 1px 2px rgba(10, 46, 115, 0.04)",
        luxury: "0 8px 32px rgba(7, 36, 90, 0.1), 0 2px 8px rgba(7, 36, 90, 0.06)",
        premium:
          "0 12px 40px rgba(7, 36, 90, 0.12), 0 4px 12px rgba(200, 155, 60, 0.08)",
        glass: "0 8px 32px rgba(7, 36, 90, 0.08)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(180deg, rgba(7,36,90,0.55) 0%, rgba(7,36,90,0.75) 50%, rgba(7,36,90,0.92) 100%)",
        "gold-gradient": "linear-gradient(135deg, #C89B3C 0%, #D4AD5C 50%, #C89B3C 100%)",
        "section-fade": "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "whatsapp-pulse": "whatsappPulse 2.5s ease-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "1", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.92", transform: "scale(1.04)" },
        },
        whatsappPulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.45)" },
          "70%": { boxShadow: "0 0 0 14px rgba(37, 211, 102, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
