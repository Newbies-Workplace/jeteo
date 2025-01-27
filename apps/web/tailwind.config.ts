import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4340BE",
        background: "#F3F3F3",
        surface: "#FFFFFF",
        live: {
          DEFAULT: "#F75254",
          hover: "#de494b",
          active: "#c54143",
        },
        stroke: "#DBDBDB",
        black: "#000000",
        gray: "#717171",
        lightGray: {
          DEFAULT: "#9f9f9f",
          hover: "#c9c9c9",
        },
        white: "#FFFFFF",
        primaryHover: "#3C3AAB",
        primaryActive: "#363398",
        light: {
          DEFAULT: "#ECECF9",
          hover: "#E3E2F5",
          active: "#C5C4EB",
        },
        success: "#6BBC91",
        space: {
          DEFAULT: "#12132F",
          dark: "#080736",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
