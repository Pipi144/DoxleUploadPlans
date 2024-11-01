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
    },
  },
  plugins: [],
};
export default config;
