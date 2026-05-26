import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        // legacy (keep for any old src/ references)
        heading: ["Cinzel", "serif"],
        body: ["Raleway", "sans-serif"],
      },
      colors: {
        // ── Solara Flames brand palette ──
        navy:  "#0a0a1a",
        navy2: "#0f0f2e",
        navy3: "#141432",
        k1:    "#2C5EAD",
        k2:    "#1591DC",
        k3:    "#4BB8FA",
        k4:    "#C4E2F5",
        // ── shadcn/radix semantic tokens (legacy) ──
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":       { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%":       { opacity: "1" },
        },
        drift: {
          "0%":   { transform: "translate(0, 0)" },
          "25%":  { transform: "translate(10px, -20px)" },
          "50%":  { transform: "translate(-5px, -40px)" },
          "75%":  { transform: "translate(15px, -20px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        float:            "float 6s ease-in-out infinite",
        "pulse-glow":     "pulse-glow 3s ease-in-out infinite",
        drift:            "drift 20s ease-in-out infinite",
        "fade-in":        "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
