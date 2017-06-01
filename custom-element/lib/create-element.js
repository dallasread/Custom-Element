var Bars = require('bars'),
    registerBars = require('./register-bars'),
    attach = require('./attach');

module.exports = function createElement(config, constructor) {
    var _ = this,
        bars = new Bars(),
        el = _.generate(constructor);

    el.createElement = createElement;
    el.registerBars = registerBars(bars);
    el.registerBars(config);
    el.attach = attach;

    return el;
};
