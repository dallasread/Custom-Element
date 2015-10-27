# Custom-Element
A model for building custom UI components using Generat-JS

## Dependencies
- generate-js
- jQuery
- Bars
- CustomElement

## Example

```
var CustomElement = require('../utils/custom-element'),
    Bindable = require('generate-js-bindings');

var config = {
    templates: {
        index: 'No template set for {{@key}}.'
    }
};

var MyElement = CustomElement.createElement(config, function MyElement(options) {
    var _ = this;

    _.supercreate(options);
});

Bindable.generateGettersSetters(MyElement, ['specialVar']); // Optionally add Getter/Setters

MyElement.definePrototype({
    myMethod: function myMethod(done) {
        typeof done === 'function' && done();
    }
});

module.exports = MyElement;
```

Now, you can create an element like so:

```
var el = MyElement.create({
    $element: $('#myelement')
});
```

Then, you can:

```
el.set('name', 'Things');
el.update();
```

Or, for variables that have been declared through `generate-js-bindings` `generateGettersSetters` method:

```
el.specialVar = 'Hi, world!';
el.update();
```
