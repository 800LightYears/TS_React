/*
 * @Author: LightYear
 * @Date: 2020-08-24 00:06:49
 * @LastEditors: LightYear
 * @LastEditTime: 2020-08-24 14:37:06
 * @FilePath: \ui\webpack.prod.js
 */

const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/css/main.css',
    }),
    new webpack.DefinePlugin({
      PROD: JSON.stringify('prod'),
    }),
    new HtmlWebpackPlugin({
      title: 'TS React',
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
      },
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
})