const path = require('path')

module.exports = {
  // output: {
  //   filename: 'mockajax.min.js',
  //   path: path.join(__dirname, '../lib/mockajax/1.0.0'),
  //   library: 'MockAjax',
  //   libraryTarget: "umd"
  // },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}