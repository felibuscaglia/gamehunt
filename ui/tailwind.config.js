/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-brand-color": "var(--primary-brand-color)",
        "primary-brand-color-light": "var(--primary-brand-color-light)",
        "primary-brand-color-medium": "var(--primary-brand-color-medium)"
      },
    },
  },
  plugins: [],
};