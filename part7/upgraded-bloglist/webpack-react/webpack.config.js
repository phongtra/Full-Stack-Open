const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = (env, argv) => {
  const backend_url = 'http://localhost:3003';

  //@babel/polyfill is used to support async/await syntax
  return {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
      publicPath: '/'
    },
    devServer: {
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
      open: true,
      hot: true
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'build', 'index.html'),
        filename: './index.html'
      })
    ]
  };
};
module.exports = config;
