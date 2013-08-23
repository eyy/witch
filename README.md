![Witch.js](http://witch.io/img/icon.png)&nbsp;[Witch.js](http://witch.io/)
=======

A witchery Javascript MVC, based on [Rivets](http://rivetsjs.com/) and [Watch.js](http://qix.github.io/watch.js/).

### [Getting started && examples](http://witch.io/)!
### Only 2kb minified and gziped!

Install
-------
`bower install witch`

Use
---
```html
<div data-rivets="app">
    <h1 data-text="config.title"></h1>
</div>

<!-- dependencies -->
<script src="components/jquery/jquery.min.js"></script>
<script src="components/watch/index.js"></script>
<script src="components/rivets/dist/rivets.js"></script>

<!-- witchcraft -->
<script src="components/witch/dist/witch.min.js"></script>
<script>
    var app = {
        config: {
            title: 'Bewitched'
        }
    };
</script>
```

Documantation
-------------

- Overview
- [Model](https://github.com/eyy/witch/wiki/Model)
- Collection
- [Template](https://github.com/eyy/witch/wiki/Template)
- Misc

License
----
MIT