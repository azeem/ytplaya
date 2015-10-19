//
// Webpack config for Client Side Bundle
//

require("es6-promise").polyfill();
var path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: "inline-source-map",
  entry: [
    "./index.js"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }), 
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel"],
        exclude: /node_modules/,
        include: __dirname
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  }
};