var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var bootstrapEntryPoints = require('./webpack.bootstrap.config');

var isProd = process.env.NODE_ENV === 'production'; // true or false
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader','sass-loader'],
    publicPath: '/public'
});
var cssConfig = isProd ? cssProd : cssDev;

var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        app: './src/App.js',
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js' //dynamic name from entry...
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=[name].[ext]&publicPath=./&outputPath=images/',
                    'image-webpack-loader'
                ]
            },
            { test: /\.(woff2?|svg)$/, use: 'url-loader?limit=10000?name=fonts/[name].[ext]' },
            { test: /\.(ttf|eot|woff2?)$/, use: 'file-loader?name=fonts/[name].[ext]' },
            { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
        // hot: true, // NOT WORKING!!
        stats: 'errors-only',
        open: true // opens automatically browser
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Basic Server',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: 'src/index.html'
        }),
        new ExtractTextPlugin({
            filename: '/css/[name].css',
            disable: !isProd,
            allChunks: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
}
