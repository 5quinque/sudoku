const webpack = require("webpack");
const path = require('path');

module.exports = {
  entry: {
    "main": './src/script.js',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  //plugins: [
  //  new webpack.optimize.UglifyJsPlugin({
  //    include: /\.min\.js$/,
  //    minimize: true
  //  })
  //]
};

