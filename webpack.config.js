const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'mockajax.min.js',
    path: path.join(__dirname, '../lib/mockajax/1.0.0'),
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
  }
}