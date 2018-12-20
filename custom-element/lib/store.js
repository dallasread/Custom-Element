var Generator = require('generate-js'),
    events = require('events'),
    IS_INTEGER = /^\d+$/,
    SPLITTER = /\/|\./;

var Store = Generator.generateFrom(events.EventEmitter, function Store(data) {
    var _ = this;

    _.defineProperties({
        writable: true
    },
    {
        data: typeof data === 'object' ? data : {}
    });
});

Store.definePrototype({
    set: function set(key, value, startObj) {
        if (typeof key === 'undefined') return;

        this.data = typeof this.data === 'object' ? this.data : {};

        var _ = this,
            splat = key.split(SPLITTER),
            lastKey = splat.pop(),
            obj = startObj || _.data;

        for (var i = 0; i < splat.length; i++) {
            if (IS_INTEGER.test(splat[i]) && typeof obj[parseInt(splat[i])] !== 'undefined') {
                splat[i] = parseInt(splat[i]);
            }

            if (typeof obj[splat[i]] !== 'object') {
                obj[splat[i]] = {};
            }

            obj = obj[splat[i]];
        }

        if (IS_INTEGER.test(lastKey) && obj instanceof Array) {
            obj[parseInt(lastKey)] = value;
        } else {
            obj[lastKey] = value;
        }

        _.emit('update', key, value, startObj);

        return value;
    },

    unset: function unset(key, startObj) {
        if (typeof key === 'undefined') return;

        this.data = typeof this.data === 'object' ? this.data : {};

        var _ = this,
            splat = key.split(SPLITTER),
            lastKey = splat.pop(),
            obj = startObj || _.data;

        for (var i = 0; i < splat.length; i++) {
            if (typeof obj[splat[i]] !== 'object') {
                obj[splat[i]] = {};
            }

            obj = obj[splat[i]];
        }

        delete obj[lastKey];

        obj = startObj || _.data;

        for (i = 0; i < splat.length; i++) {
            if (typeof obj[splat[i]] === 'object' && !Object.keys(obj[splat[i]]).length) {
                delete obj[splat[i]];
                break;
            }

            obj = obj[splat[i]];
        }

        _.emit('update', key, void(0), startObj);
    },

    get: function get(key, startObj, defaultValue) {
        if (typeof key === 'undefined') return defaultValue;

        var _ = this,
            splat = key.split(SPLITTER),
            lastKey = splat.pop(),
            obj = startObj || _.data;

        for (var i = 0; i < splat.length; i++) {
            obj = obj[splat[i]];
            if (typeof obj !== 'object') return defaultValue;
        }

        return obj[lastKey] || defaultValue;
    },

    push: function push(key, value, startObj) {
        var _ = this,
            arr = _.get(key, startObj);

        if (arr instanceof Array) {
            arr.push(value);
            _.set(key, arr, startObj);
        } else if (typeof arr === 'object' && typeof arr !== 'undefined') {
            var keys = Object.keys(arr),
                lastKey = keys[keys.length - 1],
                nextKey = parseInt(lastKey) + 1;
            _.set(key + '.' + nextKey, value, startObj);
        } else {
            _.set(key, [value], startObj);
        }
    }
});

module.exports = Store;
