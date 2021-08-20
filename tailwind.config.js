const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/html/*.html',
    './src/js/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'mobile':{'min': '279px', 'max': '415px'},
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
