var CustomElement = require('./custom-element');

if (typeof window !== 'undefined') {
    window.CustomElement = CustomElement;
}

module.exports = CustomElement;
