var Bars = require('bars'),
    registerBars = require('./register-bars'),
    attach = require('./attach');

module.exports = function createElement(config, constructor, bars) {
    var _ = this,
        el = _.generate(constructor);

    el.createElement = createElement;
    el.registerBars = registerBars(el.prototype.bars || bars || new Bars());
    el.registerBars(config);
    el.attach = attach;

    return el;
};
