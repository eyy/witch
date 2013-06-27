![Witch.js](http://eyy.github.io/witch/img/icon.png)&nbsp;[Witch.js](http://eyy.github.io/witch/)
=======

A witchery Javascript MVC, based on [Rivets](http://rivetsjs.com/) and [Watch.js](http://qix.github.io/watch.js/)

[Getting started with examples](http://eyy.github.io/witch/).

Install
-------
`bower install witch`

Use
---
```html
<div class="container" data-rivets="app">
    <h1 data-text="config.title"></h1>
</div>

<!-- scripts -->
<script src="components/jquery/jquery.js"></script>
<script src="components/rivets/dist/rivets.js"></script>
<script src="components/watch/index.js"></script>
<script src="components/witch/dist/rivets-extras.js"></script> <!-- optional -->
<script src="components/witch/dist/rivets-adapter.js"></script>
<script src="components/witch/dist/witch.js"></script>
<script>
    var app = {
        config: {
            title: 'Bewitched.'
        }
    };
</script>
```
