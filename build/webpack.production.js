const path = require('path');
const WebpackMerge = require('webpack-merge');
const WoxWebpackRuntimePlugin = require('@wox/loader/server');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BasicConfigs = require('./webpack.base');
const cwd = process.cwd();

module.exports = WebpackMerge(BasicConfigs, {
  mode: 'production',
  output: {
    filename: '[name].[hash:10].js',
    path: path.resolve(cwd, 'dist'),
    publicPath: ''
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins:[
    new WoxWebpackRuntimePlugin().loadCommonCase(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.production.html'),
      title: 'Wox Application - Production'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[hash:10].css',
      chunkFilename: "[id].[hash:10].css"
    })
  ]
})