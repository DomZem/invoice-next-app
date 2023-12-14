import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        primaryHover: "var(--primaryHover)",
        midnightBlue: "var(--midnightBlue)",
        darkRoyalBlue: "var(--darkRoyalBlue)",
        softLavender: "var(--softLavender)",
        heatherGray: "var(--heatherGray)",
        bluebellGray: "var(--bluebellGray)",
        starlessNight: "var(--starlessNight)",
        whisperWhite: "var(--whisperWhite)",
        darkAbyss: "var(--darkAbyss)",
        destructive: "var(--destructive)",
        destructiveHover: "var(--destructiveHover)",
      },
    },
    boxShadow: {
      wrapper: "0px 10px 10px -10px rgba(72, 84, 159, 0.10)",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
