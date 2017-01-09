# Custom-Element
A model for building custom UI components using Generate-JS

## Example

```
var CustomElement = require('generate-js-custom-element');

var CONFIG = {
    template: 'My name is\
        {{#unless person/name}}\
            unknown\
        {{else}}\
            <a class="person">{{person/name}}</a>\
        {{/unless}}.',
    blocks: { // see bars package for usage
        unless: function unless(data, consequent, alternate, context) {
            data ? alternate() : consequent();
        }
    },
    interactions: { // see interactions package for usage
        personClick: {
            event: 'click',
            target: 'a.person',
            action: function action(e, el) {
                var _ = this;
                _.set('nameClicked', true);
                _.doStuff();
                alert(el.innerHTML);
                return false;
            }
        }
    },
    data: { // Default data
        person: {
            name: 'John Doe'
        }
    }
};

var MyElement = CustomElement.createElement(CONFIG, function MyElement(options) {
    var _ = this;
    CustomElement.call(_, options);
});

MyElement.definePrototype({
    doStuff: function doStuff(done) {
        done();
    }
});

module.exports = MyElement;
```

Now, you can create a new `MyElement` in any HTML element like so:

```
var el = MyElement.create({
    $element: document.getElementById('my-element')
});
```

Then, you can:

```
el.set('person.name', 'John Doe');
el.get('person.name.length');
```

## Dependencies
- generate-js
- bars
- interactions (jQuery not required, but more performant)
