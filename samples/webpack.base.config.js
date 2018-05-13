const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: {
    reactD3Samples: './react-d3-samples.tsx',
    vendor: [
      'react',
      'react-dom',
      'react-faux-dom',
      'd3-selection',
      'd3-scale',
      'd3-axis',
      'd3-array',
      'd3-shape',
      'd3-interpolate',
      'd3-random',
      'd3-transition'
    ],
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: "[local]___[hash:base64:5]"
            }},
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
    ],
  },
  plugins: [
    // Generate development gallery index.html in /dist. Only for development purposes.
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      inject: 'body',
    }),
    new BundleAnalyzerPlugin()
  ],
};
