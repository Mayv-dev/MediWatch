/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","./node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend:{
      colors:{
        regularDoseReady:{500:"#15FF00"},
        regularAttention:{500:"#FBFF00"},
        regularWarning:{500:"#FF0000"},
        
        rgColourblindDoseReady:{500:"#0008FF"},
        rgColourblindAttention:{500:"#C673B3"},
        rgColourblindWarning:{500:"#FBFF00"},


        commonBG:{
          100:"#F5F5DC",
          900:"#211A53"},

        commonTitle:{
          100:"#3e3eFF",
          900:"#FFe000",
        }
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

