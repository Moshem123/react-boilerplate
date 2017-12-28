const webpack = require('webpack');
const path = require('path');
const pkg = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index',
        // vendor  : Object.keys(pkg.dependencies) //get npm vendors deps from config
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },

    plugins: [
        // Clear out `build` directory between builds
        new CleanWebpackPlugin(['public'], {
            root: process.cwd(),
        }),
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
    ],
};