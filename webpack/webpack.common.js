const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = '../src/';
const ChromeIntlCodeGenPlguin = require('chrome-intl-code-gen').default;


module.exports = {
  entry: {
    popup: path.join(__dirname, srcDir + 'popup/index.tsx'),
    options: path.join(__dirname, srcDir + 'options/index.tsx'),
    background: path.join(__dirname, srcDir + 'background.ts'),
    content_script: path.join(__dirname, srcDir + 'content_script.ts')
  },
  output: {
    path: path.join(__dirname, '../dest'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: "initial"
    }
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pac/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyPlugin([{
      from: '.',
      to: '../dest'
    }], {
      context: 'public'
    }),
    new ChromeIntlCodeGenPlguin({
      input: "public/_locales",
      output: "src/shared/locale.ts"
    })
  ]
};
