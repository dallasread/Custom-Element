var Generator = require('generate-js'),
    $ = require('jquery'),
    Handlebars = require('handlebars');

var CustomElement = Generator.generate(function CustomElement(element, config, data) {
    var _ = this;
    var data = data || {};

    _.defineProperties({
        config: config,
        handlebars: Handlebars.create(),
        components: [],
        $element: $(element),
        data: {
            get: function get() {
                return data;
            },
            set: function set(newData) {
                data = newData;
                _.render();
            }
        }
    });

    _.handlebars.registerHelper('component', function(componentName, options) {
        var component = _.config.subComponents[componentName];
        var handlebarsData = this;

        if (component) {
            var id = componentName.toLowerCase() + '-' + Math.random().toString(36).substring(7);

            setTimeout(function dumbTimeout() {
                var obj = component.create('[data-id="' + id + '"]', handlebarsData);
                _.components[componentName].push(obj);
            }, 0);

            return new _.handlebars.SafeString('<div data-id="' + id + '">' + handlebarsData + '</div>');
        } else {
            throw new Error('No component found (' + componentName + ').');
        }
    });

    _.init();
});

CustomElement.createElement = function createElement(config) {
    return this.generate(function Element(el, data) {
        this.supercreate(el, config, data);
    });
};

CustomElement.definePrototype({
    init: function init() {
        var _ = this;
        _.parseInteractions();
        _.parseTemplate();
        _.render();
    },
    parseInteractions: function parseInteractions() {
        var _ = this;
        _.$element.off();

        for (var key in _.config.interactions) {
            var interaction = _.config.interactions[key];

            function eventListener(interaction) {
                return function (event) {
                    interaction.listener.call(_, event, $(this));
                };
            }

            if (interaction.target) {
                _.$element.on(interaction.event, interaction.target, eventListener(interaction));
            } else {
                _.$element.on(interaction.event, eventListener(interaction));
            }
        }
    },
    parseTemplate: function parseTemplate() {
        var _ = this;
        _.renderTemplate = _.handlebars.compile(_.config.template);
    },
    update: function(newData) {
        var _ = this;

        for (var key in newData) {
            _.data[key] = newData[key];
        }

        _.render();
    },
    render: function render() {
        var _ = this;
        _.$element.html(_.renderTemplate(_.data));
    }
});

window.$ = $;
window.CustomElement = module.exports = CustomElement;
