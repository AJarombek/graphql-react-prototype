/**
 * Setup Webpack for bundling JavaScript and Less files.
 * @author Andrew Jarombek
 * @since 4/7/2020
 */

const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const env = dotenv.config().parsed;

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/index.js'),
    styles: path.join(__dirname, 'src/index.less')
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.GITHUB_ACCESS_TOKEN': JSON.stringify(env.GITHUB_ACCESS_TOKEN)
    })
  ],
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js',
    publicPath: '',
    libraryTarget: 'umd'
  }
};
