/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        "secondary-foreground": "hsl(var(--secondary-foreground) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",
        destructive: "hsl(var(--destructive) / <alpha-value>)",
        "destructive-foreground": "hsl(var(--destructive-foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        slideInLeft: "slideInLeft 0.6s ease-out forwards",
        slideInRight: "slideInRight 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 2s infinite",
        wave: "wave 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        bubble: "bubble 2s ease-in infinite",
        scaleIn: "scaleIn 0.5s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "from": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "to": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInLeft: {
          "from": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "to": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideInRight: {
          "from": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "to": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 0 0 rgba(16, 185, 129, 0.7)",
          },
          "50%": {
            "box-shadow": "0 0 0 10px rgba(16, 185, 129, 0)",
          },
        },
        wave: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        shimmer: {
          "0%": {
            "background-position": "-1000px 0",
          },
          "100%": {
            "background-position": "1000px 0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "rotate-slow": {
          "from": {
            transform: "rotate(0deg)",
          },
          "to": {
            transform: "rotate(360deg)",
          },
        },
        bubble: {
          "0%": {
            transform: "translateY(0) scale(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-100px) scale(1)",
            opacity: "0",
          },
        },
        scaleIn: {
          "from": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "to": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
