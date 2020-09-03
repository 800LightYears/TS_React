const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const { resolve } = require('path')

process.env.NODE_ENV = 'development'

const commonCssLoader = ['style-loader', 'css-loader']

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../', 'dist'),
  },
  devtool: 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    progress: true,
    compress: true,
    open: true,
    hot: true,
    contentBase: path.resolve(__dirname, '../', 'dist'),
    watchContentBase: true,
    watchOptions: {
      poll: 1,
      aggregateTimeout: 500,
      ignored: /node_modules/,
    },
    quiet: true,
    clientLogLevel: 'error',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {
    //       '/api': '',
    //     },
    //   },
    // },
    // before(app) {
    //   app.get('/user', (req, res) => {
    //     res.json({
    //       name: 'aaaa',
    //     })
    //   })
    // },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [...commonCssLoader, 'less-loader'],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TS React',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev'),
    }),
    new HardSourceWebpackPlugin(),
  ],
})
