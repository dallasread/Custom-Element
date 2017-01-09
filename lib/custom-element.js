var Generate = require('generate-js'),
    Interactions = require('interactions'),
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

    new Interactions({
        emitter: _.$element,
        interactions: _.generator.interactions,
        thisArg: _,
        $: options.$
    });
});

CustomElement.createElement = createElement;

CustomElement.definePrototype(require('./get-set'));
CustomElement.definePrototype(require('./events'));

if (window) window.CustomElement = CustomElement;

module.exports = CustomElement;
