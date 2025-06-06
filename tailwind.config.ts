import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react"; // Importe o nextui

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Adicione o caminho para os node_modules do NextUI
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // Habilita o modo escuro
  plugins: [nextui()], // Adicione o plugin
};
export default config;