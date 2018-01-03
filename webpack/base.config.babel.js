import webpack from 'webpack';
// import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export default {
    entry: {
        app: './src/index'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },

    plugins: [
        // Clear out `build` directory between builds
        new CleanWebpackPlugin(['dist'], {
            root: process.cwd(),
        }),
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
        // Inject script tag to html
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                collapseWhitespace: true,
                html5: true,
            }
        }),
    ],
};