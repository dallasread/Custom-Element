var SPLITTER = /\/|\./;

function removeEmptyObjects(data) {
    for (var key in data) {
        if (data[key]) {
            if (typeof data[key] === 'object') {
                if (data[key] instanceof Array) {

                } else if (!Object.keys(data[key]).length) {
                    delete data[key];
                } else {
                    removeEmptyObjects(data[key]);
                }
            }
        }
    }
}

module.exports = {
    set: function set(key, value, changer) {
        this._data = typeof this._data === 'object' ? this._data : {};

        var _ = this,
            splat = key.split(SPLITTER),
            lastKey = splat.pop(),
            obj = _._data,
            oldValue;

        for (var i = 0; i < splat.length; i++) {
            if (typeof obj[splat[i]] !== 'object') {
                obj[splat[i]] = {};
            }

            obj = obj[splat[i]];
        }

        oldValue = obj[lastKey];
        obj[lastKey] = value;
        _.update();
        _.emit('set', key, oldValue, value, changer);

        return value;
    },

    unset: function unset(key, changer) {
        this._data = typeof this._data === 'object' ? this._data : {};

        var _ = this,
            splat = key.split(SPLITTER),
            lastKey = splat.pop(),
            obj = _._data,
            oldValue;

        for (var i = 0; i < splat.length; i++) {
            if (typeof obj[splat[i]] !== 'object') {
                obj[splat[i]] = {};
            }

            obj = obj[splat[i]];
        }

        oldValue = obj[lastKey];

        delete obj[lastKey];

        removeEmptyObjects(_._data);

        _.update();
        _.emit('unset', key, oldValue, changer);
    },

    get: function get(key) {
        var _ = this,
            splat = key.split(SPLITTER),
            lastKey = splat.pop(),
            obj = _._data;

        for (var i = 0; i < splat.length; i++) {
            obj = obj[splat[i]];
            if (!obj) return;
        }

        return obj[lastKey];
    }
};
