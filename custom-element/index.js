var Store = require('./lib/store'),
    createElement = require('./lib/create-element'),
    findTemplate = require('./lib/find-template');

function merge(a, b) {
    for (var key in b) {
        a[key] = b[key];
    }
}

var CustomElement = Store.generate(function CustomElement(options) {
    var _ = this;

    if (typeof options !== 'object') options = {};

    Store.call(_, typeof options === 'object' ? options.data : {});

    var dom = _.bars.build(
        _.bars.preCompile(
            findTemplate(_, options.template || _.template),
            'index',
            null,
            {
                minify: true
            }
        ), _._data);

    _.defineProperties({
        element: dom.rootNode,
        dom: dom
    });

    _.on('update', function() {
        _.update();
    });

    _.update();
});

CustomElement.createElement = createElement;

CustomElement.definePrototype({
    init: function init() {
        this.update();
        return this.element;
    },
    update: function update(data) {
        var _ = this;

        if (typeof data === 'object') {
            merge(_._data, data)
        }

        _.dom.update(_._data);
    }
});

module.exports = CustomElement;
