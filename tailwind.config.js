/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        global:"rgba(17,25,40,0.7)",
        bColor:"#dddddd35",
        inbg:"rgba(17,25,40,0.5)",

      },
      screens:{
        "max-640":{"max":"640px"}
      }
    },
  },
  plugins: [],
}