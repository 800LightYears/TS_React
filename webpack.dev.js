/*
 * @Author: LightYear
 * @Date: 2020-08-24 00:06:30
 * @LastEditors: LightYear
 * @LastEditTime: 2020-08-25 00:51:17
 * @FilePath: \ui\webpack.config.js
 */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // watch: true,
  // watchOptions: {
  //   poll: 1,
  //   aggregateTimeout: 500,
  //   ignored: /node_modules/,
  // },
  // devServer: {
  //   port: 8080,
  //   progress: true,
  //   contentBase: './dist',
  //   devtool: 'eval-source-map',
  //   // proxy: {
  //   //   '/api': {
  //   //     target: 'http://localhost:3000',
  //   //     pathRewrite: {
  //   //       '/api': '',
  //   //     },
  //   //   },
  //   // },
  //   // before(app) {
  //   //   app.get('/user', (req, res) => {
  //   //     res.json({
  //   //       name: 'aaaa',
  //   //     })
  //   //   })
  //   // },
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TS React',
      template: './src/index.html',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev'),
    }),
  ],
})
