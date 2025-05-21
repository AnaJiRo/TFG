/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        purpleTheme: {
          primary: "#7C3AED",
          secondary: "#c084fc",
          background: "#E9D5FF",
          dark: "#4A044E",
          accent: "#F97316",
          success: "#14B8A6",
          error: "#F87171",
          text: "#1F2937",
          border: "#E5E7EB"
        },
        pinkTheme: {
          primary: "#8B5CF6",
          background: "#F3E8FF",
          dark: "#4C1D95",
          accent: "#EC4899",
          success: "#34D399",
          error: "#F87171",
          text: "#1F2937",
          border: "#E5E7EB"
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif']
      }
    },
  },
  plugins: [],
}
