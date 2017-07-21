module.exports = function registerBarsWrapper(bars) {
    return function registerBars(config) {
        var _ = this,
            key;

        if (typeof config.transforms === 'object') {
            for (key in config.transforms) {
                if (config.transforms.hasOwnProperty(key)) {
                    bars.registerTransform(key, config.transforms[key]);
                }
            }
        }

        if (typeof config.blocks === 'object') {
            for (key in config.blocks) {
                if (config.blocks.hasOwnProperty(key)) {
                    bars.registerBlock(key, config.blocks[key]);
                }
            }
        }

        if (typeof config.partials === 'object') {
            for (key in config.partials) {
                if (config.partials.hasOwnProperty(key)) {
                    bars.registerPartial(key, config.partials[key]);
                }
            }
        }

        if (typeof config.components === 'object') {
            for (key in config.components) {
                if (config.components.hasOwnProperty(key)) {
                    bars.registerComponent(key, config.components[key]);
                }
            }
        }

        _.definePrototype({
            writable: true
        }, {
            template: config.template,
            bars: bars
        });
    };
};
