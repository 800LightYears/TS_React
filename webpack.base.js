/*
 * @Author: LightYear
 * @Date: 2020-08-19 22:54:21
 * @LastEditors: LightYear
 * @LastEditTime: 2020-08-25 00:47:02
 * @FilePath: \ui\webpack.base.js
 */

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  resolve: {
    modules: [path.resolve('node_modules')],
    // mainFields: ['style', 'main'],
    // mainFiles: [],
    // extensions: ['js', '.css', 'json'],
    // alias: {

    // },
  },
  plugins: [
    // new webpack.ProvidePlugin(),
    new webpack.BannerPlugin('make 2020 by LightYear'),
    // new webpack.IgnorePlugin(),
    new MiniCssExtractPlugin({
      filename: '/css/main.css',
    }),
    new CleanWebpackPlugin(),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json'),
    // }),
  ],
  // externals: [],
  module: {
    rules: [
      {
        test: /\.html?$/,
        use: 'html-withimg-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8196,
            outputPath: '/img/',
            // publicPath: '',
          },
        },
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre',
      //     },
      //   },
      // },
      {
        test: /\.js$/,
        // include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-transform-runtime',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          'less-loader',
        ],
      },
    ],
  },
}