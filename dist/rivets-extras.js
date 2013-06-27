(function() {
    var slice = [].slice;

    /*
     Rivets Formatters
     more here: https://github.com/mikeric/rivets/wiki/Example-formatters
     */
    rivets.formatters.eq = function () {
        var args = slice.call(arguments);
        return args.indexOf(args.shift()) !== -1;
    };
    rivets.formatters.neq = function() {
        var args = slice.call(arguments);
        return args.indexOf(args.shift()) === -1;
    };
    rivets.formatters.pass = function(fn, arg) {
        return function(e, el, binding) {
            var ctx = binding.view.models;
            fn.call(this, ctx[arg] || arg, binding);
        };
    };
})();