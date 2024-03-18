/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-brand-color": "var(--primary-brand-color)",
        "primary-brand-color-extra-light":
          "var(--primary-brand-color-extra-light)",
        "primary-brand-color-light": "var(--primary-brand-color-light)",
        "primary-brand-color-medium": "var(--primary-brand-color-medium)",
        "primary-brand-color-reduced": "var(--primary-brand-color-reduced)",
      },
    },
  },
  plugins: [],
};
