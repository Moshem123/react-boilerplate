import path from 'path';
import process from 'process';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import baseConfig from './base.config.babel.js';

export default merge(baseConfig, {
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].[chunkhash].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader', options: { minimize: true, importLoaders: 1 } }, 'sass-loader']
                }),
            },
        ],
    },
    plugins: [
        // Set environment for webpack
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // Hash the files using MD5 so that their names change when the content changes.
        new WebpackMd5Hash(),
        // Bundle CSS
        new ExtractTextPlugin('[name].[chunkhash].css'),
        // Bundle vendor files
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[chunkhash].js',
            minChunks: (module) => {
                return typeof module.userRequest === 'string' && !!module.userRequest.split('!').pop().match(/(node_modules|b‌​ower_components|libr‌​aries)/);
            }
        }),
        // Minify JS
        new UglifyJsPlugin({sourceMap: true}),
    ],
});