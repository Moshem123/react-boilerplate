const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    // output: {
    //     path: path.resolve(process.cwd(), 'public'),
    //     filename: 'app.js'
    // },
    devtool: 'cheap-eval-source-map',
    devServer: {
        inline: true,
        contentBase: 'src',
        port: '3001',
    },

    module: {
        rules: [
            // {
            //     test: /\.scss$/,
            //     use: [
            //         'style-loader',
            //         'css-loader?importLoaders=1',
            //         'sass-loader'
            //     ],
            // },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader', options: {importLoaders: 1 } }, 'sass-loader']
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: (module) => {
                return typeof module.userRequest === 'string' && !!module.userRequest.split('!').pop().match(/(node_modules|b‌​ower_components|libr‌​aries)/);
            }
        }),
    ],
});