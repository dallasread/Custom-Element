# Custom-Element
A model for building custom UI components

```
var MyWidget = CustomElement.createElement({
    template: 'My name is <input value="{{name}}">.\
        <hr>\
        {{>yup name=name}}',
    partials: {
        yup: '<strong>Name: {{name}}</strong>'
    },
    transforms: {
        punctuate: function punctuate(a) {
            return a + '.';
        }
    }
}, function MyWidget(options) {
    var _ = this;

    CustomElement.call(_, options || {});

    _.element.onkeyup = function keyUp(e) {
        _.set('name', e.target.value);
    };
});
```

Now, you can create a new `MyWidget` in any HTML element like so:

```
var widget = new MyWidget();
```

Or, better yet:

```
var widget = new MyWidget({
    data: {
        name: 'Dallas'
    }
});

document.body.appendChild(widget.element);
```

Then, update the data:

```
widget.set('name', 'Alex');
```
