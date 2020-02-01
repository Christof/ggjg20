const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  externals: {
    'pixi.js': 'PIXI'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'little planet', template: 'index.html' }),
    new CopyPlugin([{ from: './src/pixi.js', to: 'pixi.js' }]),
    new CopyPlugin([{ from: './assets/animations', to: './' }])
  ],
  module: {
    rules: [
      {
        test: /\.png/,
        loader: 'file-loader',
        options: {
          name: '[path]/[name].[ext]'
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
