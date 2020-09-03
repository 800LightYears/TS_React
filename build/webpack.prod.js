const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

process.env.NODE_ENV = 'production'

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()],
    },
  },
]

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'js/bundle.[contenthash:8].js',
    path: path.resolve(__dirname, '../', 'dist'),
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
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      PROD: JSON.stringify('prod'),
    }),
    new HtmlWebpackPlugin({
      title: 'TS React',
      filename: 'index.[contenthash:8].html',
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30 * 1024,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime_${entrypoint.name}`,
    },
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
})
