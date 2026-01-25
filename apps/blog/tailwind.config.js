/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./content/**/*.{md,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["NanumSquare", "Arial", "Helvetica", "sans-serif"],
        mono: ["Courier New", "Courier", "monospace"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
