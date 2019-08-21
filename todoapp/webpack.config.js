const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// base config
const SRC = './src'
const DEST = './dist'

module.exports = {
  entry: {
    'application.js': `${SRC}/javascripts/application.js`,
  },
  output: {
    path: path.resolve(__dirname, DEST),
    filename: '[name]',
    publicPath: `/`,
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true,
          cacheDirectory: true,
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js/
      })
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '*',  '.vue'],
    modules: [
      'node_modules',
      path.join(__dirname, SRC, 'javascripts'),
      path.join(__dirname, SRC)
    ],
    alias: {
             // vue.js のビルドを指定する
             vue: 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new CompressionPlugin({
      test: /\.js/
    }),
  ],
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000
  }
}
