const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const pug = require('pug');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production'; // true or false

var cssDev = ['style-loader', 'css-loader?sourceMap', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        },
        // {
        //     loader: 'postcss-loader',
        //     options: {
        //         sourceMap: true
        //     }
        // },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }
    ],
    publicPath: '/dist'
});
var cssConfig = isProd ? cssProd : cssDev;


module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    devtool: 'source-map',

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 7000,
        hot: true,
        stats: 'errors-only',
        open: true
    },

    module: {
        rules: [{
            test: /\.scss$|css$/,
            exclude: /node_modules/,
            use: cssConfig
        }, ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: path.resolve(__dirname, 'src/view/index.html'),
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Susy & Breakpoint Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: path.resolve(__dirname, 'src/view/susy.html'),
            filename: 'susy.html'
        }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            // disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}