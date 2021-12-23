const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: './dist',
    hot: true,
  },
  mode: "development",
  module: {
    rules: [
        {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
  ]
};

module.exports = config;