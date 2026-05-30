/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ubta: {
          orange: 'rgb(var(--ubta-orange) / <alpha-value>)',
          green: 'rgb(var(--ubta-green) / <alpha-value>)',
          blue: 'rgb(var(--ubta-blue) / <alpha-value>)',
          navy: 'rgb(var(--ubta-navy) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}