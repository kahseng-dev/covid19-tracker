module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/html/*.html',
    './src/js/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
