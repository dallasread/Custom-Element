module.exports = function attach(config) {
    var _ = this,
        klass = config.class,
        proto = config.proto,
        key;

    delete config.proto;
    delete config.class;

    _.registerConfig(config);

    for (key in klass) {
        _[key] = klass[key];
    }

    _.definePrototype({
        writable: true,
        configurable: true
    }, proto);

    config.class = klass;
    config.proto = proto;
};
