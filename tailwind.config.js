/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
          950: "var(--color-primary-950)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "animate-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "animate-out": {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.95)" },
        },
        "fade-in-0": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out-0": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "zoom-in-95": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "zoom-out-95": {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.95)" },
        },
        "slide-in-from-top-2": {
          from: { transform: "translateY(-0.5rem)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-bottom-2": {
          from: { transform: "translateY(0.5rem)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-left-2": {
          from: { transform: "translateX(-0.5rem)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-from-right-2": {
          from: { transform: "translateX(0.5rem)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "animate-in": "animate-in 0.2s ease-out",
        "animate-out": "animate-out 0.2s ease-in",
        "fade-in-0": "fade-in-0 0.2s ease-out",
        "fade-out-0": "fade-out-0 0.2s ease-in",
        "zoom-in-95": "zoom-in-95 0.2s ease-out",
        "zoom-out-95": "zoom-out-95 0.2s ease-in",
        "slide-in-from-top-2": "slide-in-from-top-2 0.2s ease-out",
        "slide-in-from-bottom-2": "slide-in-from-bottom-2 0.2s ease-out",
        "slide-in-from-left-2": "slide-in-from-left-2 0.2s ease-out",
        "slide-in-from-right-2": "slide-in-from-right-2 0.2s ease-out",
      },
    },
  },
  plugins: [],
}