// postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-nested': {}, // Add this if you use nested CSS in Tailwind
  },
};