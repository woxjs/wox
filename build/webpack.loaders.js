const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = env => {
  const isPro = env === 'production';
  return [
    {
      test: /\.js(x)?$/i,
      loader: 'babel-loader'
    },
    // {
    //   test: /\.ts(x)?$/i,
    //   loader: 'ts-loader'
    // },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          less: isPro ? [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader'
          ] : [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        }
      }
    },
    {
      test: /\.(le|c)ss$/,
      use: isPro ? [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader'
      ] : [
        'vue-style-loader',
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash:10].[ext]',
          outputPath: 'assets/'
        }
      }]
    }
  ]
}