const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js'
    },
    // devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new ExtractTextPlugin(`app${isProduction ? '.[hash]' : ''}.css`),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: `vendor${isProduction ? '.[hash]' : ''}.js`,

            // Move modules installed from npm to a separate vendor.js bundle
            // Thanks http://stackoverflow.com/a/38733864
            minChunks(module) {
                const userRequest = module.userRequest;

                if (typeof userRequest !== 'string') {
                    return false
                }

                return userRequest.indexOf('node_modules') !== -1
            }
        }),
        isProduction ? (
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                compress: {
                    warnings: true
                },
                mangle: true
            })
        ) : () => {
        }
    ]
};