/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-brand-color": "var(--primary-brand-color)",
      },
    },
  },
  plugins: [],
};