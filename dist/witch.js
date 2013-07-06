/* rivets adapter and config */
/* witch */
(function($, rivets, WatchJS) {
    if (!$)
        return console.error('Witch: where is jQuery?');
    if (!rivets)
        return console.error('Witch: where is Rivets?');
    if (!WatchJS)
        return console.error('Witch: where is WatchJS?');

    /*
     Rivets Adapter
     */
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
            subscribe: subscriber(WatchJS.watch),
            unsubscribe: subscriber(WatchJS.unwatch),
            read: reader,
            publish: reader
        },
        handler: function(el, e, binding) {
            if (!$(el).data('default'))
                e.preventDefault();
            return this.call(binding.model, binding);
        }
    });


    /*
     REST
     */
    var rest = function(method, url, data, cb, context) {
        data = data ? (method == 'get' ? $.param(data) : JSON.stringify(data)) : null;

        return $.ajax({
            type: method,
            url: url,
            data: data,
            success: cb,
            dataType: 'json',
            processData: false,
            contentType: 'application/json',
            context: context
        });
    };


    /*
     Model
     */
    var Model = function(data, collection) {
        this._collection = collection || this._collection;
		this._callback = this._callback.bind(this);
		this.update(data);
    };
    Model.prototype = {
        _parse: function(data) { return data; },
        _callback: function(data) {
            data = this._parse(data);
            if (!this._id && data._id && this._collection)
                this._collection.byId[data._id] = this;
				
            $.extend(this, data);
        },
        _clean: function() {
            var prop;
            for (prop in this)
                if (this.hasOwnProperty(prop) && prop[0] != '_')
                    this[prop] = '';
        },
        toJSON: function() {
            var o = {},
                prop;
            for (prop in this)
                if (this.hasOwnProperty(prop) && prop[0] != '_')
                    o[prop] = this[prop];
            return o;
        },
        fetch: function(data) {
            return rest('get', this._url + this._id, data, this._callback);
        },
        save: function() {
            return rest(this._id ? 'put' : 'post', this._url + this._id, this, this._callback);
        },
        saveAs: function() {
            var clone = this.toJSON();
            this._clean();
            return this._collection.push(clone).save();
        },
        delete: function() {
            if (this._id)
                return rest('delete', this._url + this._id, {}, function() {
                    this._clean();
                    this._destroyed = true;
                }, this);

            this._clean();
            this._destroyed = true;
        },
		update: function(data) {
			$.extend(this, this._parse(data));
			return this;
		}
    };


    /*
     Collection
     */
    var Collection = function(list, model, url) {
        if (typeof model == 'string') {
            url = model;
            model = null;
        }
        this.model = model || this.model || Model;
        this.url = url || this.url || this.model.prototype._url;

        this.clean();
        if (list)
            this.push(list);
    };
    Collection.prototype = {
        clean: function() {
            this.list = [];
            this.byId = {};
            return this;
        },
        fetch: function(data) {
            return rest('get', this.url, data, function(res) {
                this.push(res);
            }.bind(this));
        },
        push: function(model) {
            if (Array.isArray(model)) {
                model.forEach(this.push.bind(this));
                this.filled = true;
                return false;
            }

			if (this.byId[model._id])
				return this.byId[model._id].update(model);

            model = (model instanceof Model) ? model : new this.model(model, this);
            model._collection = this;
            model._url || (model._url = this.url);
            if (this.filled)
                model._new = true;

            WatchJS.watch(model, '_destroyed', function(prop, act, val) {
                if (val)
                    this.remove(model);
            }.bind(this));

            if (model._id) this.byId[model._id] = model;
            this.list.push(model);

            return model;
        },
        remove: function(model) {
            var i = this.list.indexOf(model);
            if (i !== -1) this.list.splice(i, 1);
            delete this.byId[model._id];
            WatchJS.callWatchers(this);
        }
    };


    /*
     Template
     */
    var Template = function(data, template) {
        this.template || (this.template = template);
        this.data = $.extend({}, this.data, data);
        this.data.tpl = this;
    };
    Template.prototype = {
        render: function(fn) {
            if (!this.template)
                return console.error('No template', this);

            arguments.length || (fn = this.ready);
            witch.config.template(this.template, this.data, function(err, el) {
                this.el = el;
                this._rivets = rivets.bind(this.el, this.data);
                if (fn) fn.call(this);
            }.bind(this));

            return this;
        }
    };


    window.witch = {
        Model: Model,
        Collection: Collection,
        Template: Template,
        rest: rest,
        config: {
            auto: true,
            template: function(tpl, data, cb) {
                var el = $($('[data-template="' + tpl + '"]').html().trim());
                cb(!el.length, el);
            }
        },
        init: function() {
            $('[data-rivets]').each(function() {
                var t = $(this),
                    m = window[t.data('rivets')];
                if (m && !m._rivets)
                    m._rivets = rivets.bind(t, m);
            });
        },
        inherit: function() {
            var args = Array.prototype.slice.call(arguments),
                parent = args[0],
                Class = function() {
                    parent.apply(this, arguments);
                };
            args.unshift(Class);
            $.extend.apply(this, args.map(function(c) {
                return (typeof c == 'function') ? c.prototype : c;
            }));
            return Class;
        }
    };

    // auto init
    $(function() {
        if (witch.config.auto)
            witch.init();
    });

})($ || jQuery, rivets, WatchJS);