/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#0b0b0b",
        use: "#252525",
        dark: "#000000"
      }
    },
  },
  plugins: [],
}
