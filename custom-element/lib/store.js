var Generator = require('generate-js'),
    events = require('events');

var Store = Generator.generateFrom(events.EventEmitter, function Store(data) {
    var _ = this;

    _.defineProperties({
        _data: typeof data === 'object' ? data : {}
    });
});

Store.definePrototype({
    set: function set(key, value) {
        this._data = typeof this._data === 'object' ? this._data : {};

        var _ = this,
            splat = key.split(/\/|\./),
            lastKey = splat.pop(),
            obj = _._data;

        for (var i = 0; i < splat.length; i++) {
            if (typeof obj[splat[i]] !== 'object') {
                obj[splat[i]] = {};
            }

            obj = obj[splat[i]];
        }

        obj[lastKey] = value;

        _.emit('update', key, value);

        return value;
    },

    unset: function unset(key) {
        this._data = typeof this._data === 'object' ? this._data : {};

        var _ = this,
            splat = key.split(/\/|\./),
            lastKey = splat.pop(),
            obj = _._data;

        for (var i = 0; i < splat.length; i++) {
            if (typeof obj[splat[i]] !== 'object') {
                obj[splat[i]] = {};
            }

            obj = obj[splat[i]];
        }

        delete obj[lastKey];

        obj = _._data;

        for (i = 0; i < splat.length; i++) {
            if (typeof obj[splat[i]] === 'object' && !Object.keys(obj[splat[i]]).length) {
                delete obj[splat[i]];
                break;
            }

            obj = obj[splat[i]];
        }

        _.emit('update', key);
    },

    get: function get(key, defaultValue) {
        var _ = this,
            splat = key.split(/\/|\./),
            lastKey = splat.pop(),
            obj = _._data;

        for (var i = 0; i < splat.length; i++) {
            obj = obj[splat[i]];
            if (typeof obj !== 'object') return defaultValue;
        }

        return obj[lastKey] || defaultValue;
    },

    push: function push(key, value) {
        var _ = this,
            arr = _.get(key);

        if (arr instanceof Array) {
            arr.push(value);
            _.set(key, arr);
        } else {
            _.set(key, [value]);
        }
    }
});

module.exports = Store;
