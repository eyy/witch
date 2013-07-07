![Witch.js](http://eyy.github.io/witch/img/icon.png)&nbsp;[Witch.js](http://witch.io/)
=======

A witchery Javascript MVC, based on [Rivets](http://rivetsjs.com/) and [Watch.js](http://qix.github.io/watch.js/).

### Only 2kb (7kb with Rivets and Watch.js) minified and gziped!
### [Getting started && examples](http://witch.io/)

Install
-------
`bower install witch`

Use
---
```html
<div data-rivets="app">
    <h1 data-text="config.title"></h1>
</div>

<!-- scripts -->
<script src="components/jquery/jquery.js"></script>
<script src="components/witch/dist/witch-dep.min.js"></script>
<!-- Witch, Watch.js and Rivets, minified together -->
<script>
    var app = {
        config: {
            title: 'Bewitched.'
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


Todo
----
- tests
