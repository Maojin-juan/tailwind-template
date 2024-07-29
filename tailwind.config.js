/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      backgroundImage: {},

      fontSize: {
        "2xl": [
          "1.5rem",
          {
            lineHeight: "2.25rem",
            fontWeight: "700",
          },
        ],
      },

      colors: {},

      fontFamily: {
        sans: ["Lato", "Roboto Mono", "sans-serif"],
        RobotoM: ["Roboto Mono"],
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "14px",
          md: "2.25rem",
        },
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
  },
  plugins: [],
};
