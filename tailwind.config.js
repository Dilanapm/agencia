/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:['Inter','sans-serif'],
      },
      colors:{
        "orange-button": '#FF4A39'
      },
    },
  },
  plugins: [
    function ({addUtilities}){
      const extendUnderline = {
        '.underline': {
            'textDecoration':'underline',
            'text-decoration-color':'white',
        },
      }
      addUtilities(extendUnderline)
    }
  ],
}

