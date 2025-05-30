const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add fallbacks for Node.js core modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "path": require.resolve("path-browserify"),
        "fs": false,
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "crypto": false,
        "buffer": require.resolve("buffer/"),
      };
      
      // Add webpack plugin for global Buffer
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ];
      
      return webpackConfig;
    },
  },
  eslint: {
    enable: false, // Disable ESLint for now to avoid babel-eslint issues
  },
};