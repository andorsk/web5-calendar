const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        process: require.resolve("process/browser"),
      };

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser.js",
        }),
        new webpack.ProvidePlugin({
          crypto: "crypto-browserify",
        }),
        new webpack.NormalModuleReplacementPlugin(/node:crypto/, (resource) => {
          resource.request = resource.request.replace(/^node:/, "");
        }),
      );

      return webpackConfig;
    },
  },
};
