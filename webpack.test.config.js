'use strict';
var path = require('path');
var APP = path.join(__dirname, '/app');

module.exports = {
    context: APP,
    mode: 'none',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'exports-loader' },
            {
                test: /\.(html|less|ejs)$/,
                loader: 'null-loader'
            }
        ]
    }
};
