const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  resolve: {
    modules: [path.resolve(__dirname, '../', 'node_modules')],
    // mainFields: ['style', 'main'],
    // mainFiles: [],
    // extensions: ['js', '.css', 'json'],
    // alias: {},
  },
  plugins: [
    // new webpack.ProvidePlugin(),
    // new webpack.IgnorePlugin(),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json'),
    // }),
  ],
  // externals: [],
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        include: path.resolve(__dirname, '../', 'src'),
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
      },
      {
        oneOf: [
          {
            test: /\.html?$/,
            use: 'html-withimg-loader',
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: {
              loader: 'url-loader',
              options: {
                name: '[contenthash:8].[ext]',
                limit: 8 * 1024,
                outputPath: 'imgs',
                esModule: false,
                // publicPath: '../',
              },
            },
          },
          {
            test: /\.(ttf|eot|woff2?)$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[contenthash:8].[ext]',
                outputPath: 'font',
              },
            },
          },
          {
            test: /\.(jsx?)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: {
                          version: 3,
                        },
                        targets: {
                          chrome: '60',
                          firefox: '60',
                          ie: '9',
                          safari: '10',
                          edge: '17',
                        },
                      },
                      // '@babel/preset-react',
                    ],
                  ],
                  plugins: [
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    [
                      '@babel/plugin-proposal-class-properties',
                      { loose: true },
                    ],
                    '@babel/plugin-transform-runtime',
                  ],
                },
              },
              // {
              //   loader: 'eslint-loader',
              //   enforce: 'pre',
              //   options: {
              //     fix: true,
              //   },
              // },
            ],
          },
        ],
      },
    ],
  },
  resolve: {
    // alias: {},
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, '../', 'node_modules'), 'node_modules'],
  },
}
