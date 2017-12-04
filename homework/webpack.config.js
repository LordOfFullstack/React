var webpack = require('webpack');
var path = require('path');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, './src');

module.exports = {
    entry: SRC_DIR + '/app/index.js',
    output: {
        path: DIST_DIR + '/app',
        filename: 'bundle.js',
        publicPath: '/app/',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.html$/,
                include: SRC_DIR,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                include: SRC_DIR,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader',
                exclude: /node_modules/
            }
        ]
    }
};
