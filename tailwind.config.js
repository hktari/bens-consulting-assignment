/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {},
  extend: {
    colors: {
      green: {
        50: "#FBFCF0",
        100: "#F9FCE3",
        200: "#EAF5B8",
        300: "#DDF090",
        400: "#C0E645",
        500: "#9AD900",
        600: "#86C400",
        700: "#67A300",
        800: "#4A8200",
        900: "#326100",
        950: "#1E4000",
      },
      red: {
        50: "#FCF8F0",
        100: "#FCF2E3",
        200: "#F5D9B8",
        300: "#F0C090",
        400: "#E68245",
        500: "#D93F00",
        600: "#C43400",
        700: "#A32900",
        800: "#821E00",
        900: "#611300",
        950: "#400C00",
      },
      blue: {
        50: "#F0FBFC",
        100: "#E3F9FC",
        200: "#B8EAF5",
        300: "#90DDF0",
        400: "#45C0E6",
        500: "#009ad9",
        600: "#0086C4",
        700: "#0067A3",
        800: "#004A82",
        900: "#003261",
        950: "#001E40",
      },
    },
  },
  plugins: [],
};
