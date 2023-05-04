/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    ".components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "url('/blob-scatter-haikei.svg')",
      },

      colors: {
        "primary-color": "#0ea5e9",
        "secondary-color": "#aacb73",
        "secondary-darker": "#779c3a",
        "primary-grey": "#e5e7eb",
        "tertiary-color": "#4b0082",
      },

      maxWidth: {
        "1/2": "50%",
        "3/4": "75%",
        "1/4": "25%",
        "1/3": "33%",
      },
    },
  },
  plugins: [],
};
