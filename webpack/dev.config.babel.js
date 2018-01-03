import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './base.config.babel.js';

export default merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        inline: true,
        contentBase: 'src',
        port: '3001',
    },

    module: {
        rules: [
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
        // Bundle css
        new ExtractTextPlugin('[name].css'),
    ],
});