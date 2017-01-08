var Generate = require('generate-js'),
    events = require('events'),
    createElement = require('./create-element');

var CustomElement = Generate.generateFrom(events.EventEmitter, function CustomElement(options) {
    options = options || {};

    var _ = this;

    _.defineProperties({
        writable: true,
        enumerable: true,
        configurable: true
    }, {
        $element: options.$element || document.createElement('div'),
        _data: options.data || {}
    });

    _.render();
});

CustomElement.createElement = createElement;
CustomElement.definePrototype(require('./get-set'));
CustomElement.definePrototype(require('./events'));

CustomElement.definePrototype({
    transforms: {},
    blocks: {},
    partials: {},
    template: ''
});

if (window) window.CustomElement = CustomElement;

module.exports = CustomElement;
