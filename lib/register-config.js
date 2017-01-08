module.exports = function registerCfg(bars) {
    return function registerConfig(config) {
        var _ = this,
            key;

        _.definePrototype({
            writable: true,
            enumerable: true,
            configurable: true
        }, {
            bars: bars,
            template: config.template
        });

        if (typeof config.transforms === 'object') {
            for (key in config.transforms) {
                bars.registerTransform(key, config.transforms[key]);
            }
        }

        if (typeof config.blocks === 'object') {
            for (key in config.blocks) {
                bars.registerBlock(key, config.blocks[key]);
            }
        }

        if (typeof config.partials === 'object') {
            for (key in config.partials) {
                bars.registerPartial(key, bars.compile(config.partials[key]));
            }
        }
    }
};
