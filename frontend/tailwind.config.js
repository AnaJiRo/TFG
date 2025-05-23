/** @type {import('tailwindcss').Config} */
module.exports = {
  // o 'media' si se prefiere que se active por preferencias del sistema
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        purpleTheme: {
          primary: "#7C3AED",      // (purple-600)
          secondary: "#c084fc",    // purple-400)
          background: "#E9D5FF",   // purple-100)
          dark: "#4A044E",
          accent: "#F97316",
          success: "#14B8A6",
          error: "#F87171",
          text: "#1F2937",        // (gray-800)
          border: "#E5E7EB"       // (gray-200)
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
        },
        fuchsiaTheme: {
          primary: "#C026D3",     // fuchsia-600 → tono principal fuerte
          secondary: "#E879F9",   // fuchsia-400 → tono más claro para fondos/acento
          background: "#FDF4FF",  // fuchsia-50 → fondo claro general
          dark: "#701A75",        // fuchsia-900 → para hover o contrastes oscuros
          accent: "#F97316",      // lo mantenemos igual que el purpleTheme
          success: "#14B8A6",     // también mantenemos igual
          error: "#F87171",       // también igual
          text: "#1F2937",        // gris oscuro para legibilidad (igual que purpleTheme)
          border: "#E5E7EB"       // gris claro (igual que purpleTheme)
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
