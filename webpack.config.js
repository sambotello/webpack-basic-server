var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var isProd = process.env.NODE_ENV === 'production'; // true or false
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader','sass-loader'],
    publicPath: '/public'
});
var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: {
        app: './src/App.js',
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].bundle.js' //synamic name from entry...
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                // use: ['style-loader','css-loader','sass-loader'],
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader','sass-loader'],
                //     publicPath: '/public'
                // })
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/public',
        compress: true,
        port: 3000,
        hot: true,
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
            filename: 'app.css',
            disable: !isProd,
            allChunks: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
}
