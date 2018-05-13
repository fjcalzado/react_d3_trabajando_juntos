const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');

module.exports = merge(base, {
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',
  devServer: {
    port: 8081,
    noInfo: true,
  },
});
