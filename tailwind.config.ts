import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        doxleColor: "rgba(54, 63, 245, 1)",
        rowBorderColor: "rgba(239,240,244,1)",
      },
      screens: {
        landscape: {
          raw: "only screen and (orientation: landscape) and (min-width: 480px) and (max-width: 1024px)",
        },
        mobileLg: {
          raw: "(min-width: 640px)",
        },
        mobileSm: {
          raw: "(min-width: 320px)",
        },
        mobileMd: {
          raw: "(min-width: 400px)",
        },
        tablet: {
          raw: "(min-width: 768px)",
        },
        laptop: {
          raw: "(min-width: 1024px)",
        },
        desktop: {
          raw: "(min-width: 1280px)",
        },
      },
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        sourcecode: ["Source Code Pro", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        gridBg: `linear-gradient(0deg, transparent 99%, rgba(230, 230, 230, 0.8) 95%), linear-gradient(90deg, transparent 99%, rgba(230, 230, 230, 0.8) 95%)`,
      },
      backgroundColor: {
        primaryBg: "rgba(241, 242, 245, 1)",
        lightBlackBg: "rgba(44,44,44,1)",
      },
      backgroundSize: {
        "grid-bg-size": "60px 50px",
      },
      boxShadow: {
        "black-soft":
          "0px 4px 10px rgba(128, 128, 128, 0.5), 0px 1px 3px rgba(128, 128, 128, 0.5)",
      },
      borderColor: {
        dxBorder: "rgba(239,240,244,1)",
        borderWhiteBg: "rgba(230,230,230,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
