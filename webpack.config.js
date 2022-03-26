const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: [
    //'./src/scss/style.scss',
    //'./src/js/main.js',
    './app.js'
  ],

  devServer: {
    static: './',
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Meeting Timer',
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
    })
  ],

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
        test: /.scss$/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed'
              }
            }
          }
        ]
      },

      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      }
    ]
  }
};