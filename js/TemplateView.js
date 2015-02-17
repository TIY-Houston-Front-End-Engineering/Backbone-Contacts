Backbone.TemplateView = Backbone.View.extend({
    cache: {},
    stream: function(url) {
        var x = $.Deferred();
        if (this.cache[url]) {
            x.resolve(cache[url]);
        } else {
            $.get(url).then((function(d) {
                this.cache[url] = _.template(d);
                x.resolve(_.template(d));
            }).bind(this));
        }
        return x;
    },
    loadTemplate: function(name) {
        return this.stream('./templates/' + name + '.html');
    },
    initialize: function(options) {
        this.options = options;
        this.model && this.model.on("change", this.render.bind(this));
    },
    render: function() {
        var self = this;
        this.loadTemplate(this.options.view || this.view).then(function(fn) {
            self.model && (self.el.innerHTML = fn(self.model.toJSON()));
        })
    }
})
