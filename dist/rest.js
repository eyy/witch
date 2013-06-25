// rest
(function($) {
    window.rest = function(method, url, data, cb, context) {
        data = data ? (method == 'get' ? $.param(data) : JSON.stringify(data)) : null;

        return $.ajax({
            type: method,
            url: url,
            data: data,
            success: !cb ? null : function() {
                cb.apply(context || this, arguments);
            },
            dataType: 'json',
            processData: false,
            contentType: 'application/json'
        });
    };

    [ 'get', 'post', 'put', 'delete' ].forEach(function(method) {
        rest[method] = rest.bind(rest, method);
    });
})(jQuery);