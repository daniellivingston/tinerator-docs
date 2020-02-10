module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === `production`
      ? {
          '@fullhuman/postcss-purgecss': {
            content: [
              './components/**/*.tsx',
              './pages/**/*.tsx',
              './utils/**/*.tsx'
            ],
            css: ['../styles/main.css'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          }
        }
      : {})
  }
};
