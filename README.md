# Custom-Element
A model for building custom UI components

```
var Widget = CustomElement.createElement({
    template: 'My name is <input value="{{name}}">.\
        <hr>\
        {{>yup name=name}}\
        {{$boom name=name}}\
        {{#if name.length}}\
            {{$boom name=\'THIS BOOM NAME DOES NOT CHANGE\'}}\
        {{/if}}',
    partials: {
        yup: '<strong>Name: {{name}}</strong>'
    },
    transforms: {
        punctuate: function punctuate(a) {
            return a + '.';
        }
    },
    components: {
        boom: CustomElement.createElement({
            template: 'Boom - {{name}}!'
        }, function Boom(options) {
            var _ = this;

            CustomElement.call(_, options || {});

            _.element.onclick = function(e) {
                alert('click!');
            };
        })
    }
}, function Widget(options) {
    var _ = this;

    CustomElement.call(_, options || {});

    _.element.onkeyup = function(e) {
        _.set('name', e.target.value);
    };
});
```

Now, you can create a new `Widget` in any HTML element like so:

```
var widget = new Widget();
```

Or, better yet:

```
var widget = new Widget({
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
