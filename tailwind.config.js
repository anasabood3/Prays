/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const { Colors } = require('./constants/Colors');


module.exports = {
  content: [],
  theme: {

    extend: {
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },

    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.btn': `px-4 py-1 rounded-full bg-red-800 text-white`,
        '.custom-view':`bg-black dark:bg-[#d34]`,
        '.default': {
          fontSize: 16,
          lineHeight: 24,
        },
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

