var Generator = require('generate-js'),
    $ = require('jquery'),
    Handlebars = require('handlebars');

Handlebars.registerHelper('component', function(options) {
  return new Handlebars.SafeString('<div class="mybold">XXX</div>');
});

var CustomElement = Generator.generate(function CustomElement(element, config, data) {
    var _ = this;
    var data = data || {};

    _.defineProperties({
        config: config,
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

    _.init();
});

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
        _.renderTemplate = Handlebars.compile(_.config.template);
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
