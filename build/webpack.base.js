const webpack = require('webpack');
const path = require('path');
const Loaders = require('./webpack.loaders');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const cwd = process.cwd();

module.exports = {
  target: 'web',
  entry: path.resolve(cwd, 'src/webpack.ts'),
  context: cwd,
  module: {
    rules: Loaders(NODE_ENV)
  },
  resolve: {
    alias: {
      '#': cwd
    },
    extensions: [".tsx", ".ts", ".js", ".vue"]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ]
}