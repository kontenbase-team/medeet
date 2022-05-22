const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{jsx,tsx}",
    "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: colors.red,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@vechaiui/core")({
      cssBase: true,
      colors: ["red"],
    }),
  ],
};
