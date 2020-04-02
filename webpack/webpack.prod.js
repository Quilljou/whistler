const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [{
          test: /\.styl$/,
          use: [
            // If you want to generate independent css files, uncoment this
            // {
            //   loader: MiniCssExtractPlugin.loader,
            // },
            // If you want to generate independent css files, comment this
            'style-loader',
            'css-loader', 'stylus-loader'],
      }]
    },
    plugins: [
        // If you want to generate independent css files, uncoment this
        // new MiniCssExtractPlugin({
        //     filename: 'css/[name].css'
        // }),
    ]
});
