const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});
module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:8080", // WebpackDevServer host and port
        "webpack/hot/only-dev-server", // "only" stops HMR on syntax errors
        'react-hot-loader/patch',
        './src/js/index.js'
    ],
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js',
    },
    devtool: "source-map",
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    plugins: [HtmlWebpackPluginConfig]
}
