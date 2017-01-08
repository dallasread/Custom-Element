var Bars = require('bars'),
    registerConfig = require('./register-config'),
    attach = require('./attach'),
    bars = new Bars();

module.exports = function createElement(config, constructor) {
    var _ = this,
        el = _.generate(constructor);

    el.createElement = createElement;
    el.registerConfig = registerConfig(bars);
    el.attach = attach;

    el.registerConfig(config);

    return el;
};
