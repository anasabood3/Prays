/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');




module.exports = {
  content: [],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#5c6ac4',
        dark:"#f233"
      },
      card:{
        default:"#34ff",
        dark:"#6644"
      },
      secondary:"#fdfd",
      white:"#ffff",
      dark:"#000000"
    },
    fontFamily: {
      regular: ["Roboto-Regular", "sans-serif"],
      bold: ["Roboto-Black", "sans-serif"],
    },
    fill: theme => theme('colors')
  },
  
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.btn': `px-4 py-1 rounded-full text-white`,
        '.custom-view':`bg-white dark:bg-black`,
        '.default':`text-[16] text-white dark:text-primary`,
        '.defaultSemiBold': {
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '600',
        },
        '.title': {
          fontSize: 32,
          fontWeight: 'bold',
          lineHeight: 32,
        },
        '.subtitle': {
          fontSize: 20,
          fontWeight: 'bold',
        },
        '.link': {
          lineHeight: 30,
          fontSize: 16,
          color: '#0a7ea4',
          
        },
      });
    }),
  ],

}

