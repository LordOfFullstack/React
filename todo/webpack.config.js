/*global require, module, __dirname */

//var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, './src');

module.exports = {
  entry: SRC_DIR + '/app/index.js',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    //publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env', 'stage-2']
        },
      },
      {
        test: /\.jsx$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env', 'stage-2']
        },
      },
      {
        test: /\.css$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader', 'postcss-loader']
        })
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    //contentBase: './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('css/bundle.css', {
      allChunks: true
    })
  ]
};
