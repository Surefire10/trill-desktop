import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ["var(--font-playwrite)"],
        manrope: ["var(--font-manrope)"],
      },
      height: {
        full: "100%",
        screen: "100vh",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        grey: "var(--grey)",
      },
    },
  },
  plugins: [],
} satisfies Config;
