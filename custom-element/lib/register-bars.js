module.exports = function registerBarsWrapper(bars) {
    return function registerBars(config) {
        var generator = this,
            key;

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
                bars.registerPartial(key, config.partials[key]);
            }
        }

        if (typeof config.components === 'object') {
            for (key in config.components) {
                bars.registerComponent(key, config.components[key]);
            }
        }

        generator.definePrototype({
            writable: true
        }, {
            template: config.template,
            bars: bars
        });
    };
};
