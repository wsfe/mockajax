const path = require('path')
const webpack = require('webpack')
const version = require('./package.json').version

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'mockajax.js',
    path: path.join(__dirname, 'dist'),
    library: 'MockAjax',
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'Mockajax - v' + version + ' - https://github.com/angrytoro/mockajax \nangrytoro <angrytoro@gmail.com>'
    })
  ]
}