//
// Webpack config for React Components on the Server Side
//

require("es6-promise").polyfill();
var webpack = require("webpack"),
    fs = require("fs"),
    path = require("path"),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: "./components/ytplaya.js",
  target: "node",

  externals: /^[a-z][a-z\.\-0-9]*$/,

  resolve: {
    extensions: ["", ".js", ".css"]
  },

  plugins: [
    // TODO: avoid redundant generation of style.css
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "server.js",
    libraryTarget: "commonjs2"
  },

  node: {
    __filename: true,
    __dirname: true,
    console: true
  },

  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader?stage=1&optional=runtime" },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  }
}