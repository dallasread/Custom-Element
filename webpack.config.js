var webpack = require('webpack');

var js = {
    entry: ['.'],
    output: { filename: './demo/custom-element.js' },
    module: {
        loaders: [
            // We need this because Bars requires its package.json
            { test: /\.json$/, loader: 'json' }
        ]
    }
};

module.exports = [js];
