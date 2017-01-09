module.exports = {
    update: function(data) {
        var _ = this;
        _.dom.update(data || _._data);
    },

    dispose: function dispose() {
        var _ = this;
        _.$element.innerHTML = '';
    },

    render: function render() {
        var _ = this;

        _.dispose();
        _.dom = _.bars.compile(_.template);
        _.dom.update(_._data);
        _.dom.appendTo(_.$element);
        _.emit('render');
    }
};
