const path = require('path');
const WebpackMerge = require('webpack-merge');
const WoxWebpackRuntimePlugin = require('@wox/loader/server');
const p = require('../src/loader/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BasicConfigs = require('./webpack.base');
const WebpackProxy = require('./webpack.proxy');
const cwd = process.cwd();

module.exports = WebpackMerge(BasicConfigs, {
  mode: 'development',
  devServer: {
    contentBase: cwd,
    compress: true,
    historyApiFallback: false,
    hot: true,
    host: '0.0.0.0',
    port: 8081,
    proxy: WebpackProxy
  },
  plugins:[
    new p(true),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.development.html'),
      title: 'Wox Application - Development'
    })
  ]
});