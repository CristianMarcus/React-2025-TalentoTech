// postcss.config.js
export default {
  plugins: {
    // ¡ESTA LÍNEA ES CRÍTICA! Debe ser '@tailwindcss/postcss'
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};