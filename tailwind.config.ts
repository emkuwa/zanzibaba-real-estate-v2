import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A584C",
          heading: "#102F2C",
          deep: "#073F37",
        },
        gold: {
          DEFAULT: "#087565",
          light: "#15927F",
        },
        ink: "#172E2A",
        body: "#44534F",
        muted: "#697570",
        surface: "#F7F4ED",
        sand: {
          DEFAULT: "#E8DFD0",
          light: "#F5F0E8",
        },
        border: "#D8D3C8",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        luxury: "0.25rem",
        "luxury-lg": "0.4rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(16, 47, 44, 0.05)",
        luxury: "0 8px 28px rgba(16, 47, 44, 0.08)",
        premium:
          "0 12px 36px rgba(16, 47, 44, 0.1)",
        glass: "0 8px 28px rgba(16, 47, 44, 0.08)",
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
