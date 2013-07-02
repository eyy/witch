/* rivets adapter and config */
(function() {
    var subscriber = function(fn) {
        return function(o, path, cb) {
            path = path.split('.');
            fn(o, path[0], cb, path.length - 1)
        };
    };
    var reader = function(o, path, value) {
        if (!path)
            return o;

        var p = path.split('.');
        while (p.length > 1) {
            o = o[p.shift()];
            if (o == undefined)
                break;
        }

        if (arguments.length === 2)
            return o[p.shift()];
        o[p.shift()] = value;
    };

    rivets.configure({
        adapter: {
            subscribe: subscriber(watch),
            unsubscribe: subscriber(unwatch),
            read: reader,
            publish: reader
        },
        handler: function(el, e, binding) {
            if (!$(el).data('default'))
                e.preventDefault();
            return this.call(binding.model, binding);
        }
    });
})();