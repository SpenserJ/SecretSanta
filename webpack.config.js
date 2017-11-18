const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'app/client/index.jsx'),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/process': 'http://localhost:8081',
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Secret Santa',
      template: path.resolve(__dirname, 'app/client/index.html'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(gif|ttf|eot|svg|woff2?)$/, use: 'url-loader?name=[name].[ext]'},
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
