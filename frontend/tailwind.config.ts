import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // 👈 이게 핵심
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
