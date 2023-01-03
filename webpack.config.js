const path = require('path');
const zlib = require('zlib');
const CompressionPlugin = require('compression-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  devServer: {
    port: 3000,
    static: path.resolve(__dirname, './dist'),
    client: false
  },
  resolve: {
    symlinks: false,
    modules: [
      'src',
      'node_modules'
    ],
    alias: {
      'src': path.resolve(__dirname,'./src'),
      'Content': path.resolve(__dirname,'./src/Content')
    },
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin(),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.jsx$|\.js$|\.css$|\.scss$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(jsx|js|css|scss|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11
        }
      },
      threshold: 10240,
      minRatio: 0.8
    }),
    new ESLintPlugin({
      files: 'src/**/*.js'
    }),
    new StylelintPlugin({
      files: 'src/**/*.scss'
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
        options: { limit: false }
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]s?$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: '[name].[contenthash].bundle.js'
  }
};
