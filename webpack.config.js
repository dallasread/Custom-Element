var js = {
    entry: ['./index.js'],
    output: { filename: './demo/custom-element.js' },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' },
            { test: /\.html$/, loader: 'html?minimize=false' },
            { test: /\.png$/,  loader: 'url-loader?mimetype=image/png' },
            { test: /\.jpeg$/, loader: 'url-loader?mimetype=image/jpeg' },
            { test: /\.gif$/,  loader: 'url-loader?mimetype=image/gif' },
        ]
    }
};

module.exports = [js];
