var Bars = require('bars'),
    registerBars = require('./register-bars'),
    registerInteractions = require('./register-interactions'),
    attach = require('./attach');

module.exports = function createElement(config, constructor) {
    var _ = this,
        el = _.generate(constructor);

    el.createElement = createElement;
    el.registerBars = registerBars(new Bars());
    el.registerInteractions = registerInteractions;
    el.attach = attach;
    el.registerBars(config);
    el.registerInteractions(_, config);

    return el;
};
