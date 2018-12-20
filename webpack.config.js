var js = {
    entry: ['./index.js'],
    output: { filename: '../demo/custom-element.js' },
    module: {
        rules: [
            // { test: /\.json$/, loader: 'json-loader' },
            { test: /\.html$/, loader: 'html-loader?minimize=false' },
            { test: /\.png$/,  loader: 'url-loader?mimetype=image/png' },
            { test: /\.jpeg$/, loader: 'url-loader?mimetype=image/jpeg' },
            { test: /\.gif$/,  loader: 'url-loader?mimetype=image/gif' },
        ]
    }
};

module.exports = [js];
