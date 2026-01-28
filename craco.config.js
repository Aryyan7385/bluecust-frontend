const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      // This bypasses deep dependency version conflicts during build
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "ajv": require.resolve("ajv"),
      };
      return webpackConfig;
    },
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
