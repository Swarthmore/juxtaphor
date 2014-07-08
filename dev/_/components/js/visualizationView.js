AV.VisualizationView = Backbone.View.extend({
    el: '#visualization',
    // The rendering of the visualization will be slightly
    // different here, because there is no templating necessary:
    // The server gives back a page.
    render: function() {
        this.model.url = this.model.urlRoot + this.model.id +
            '/view?mode=heatmap&condensed=true';
        this.$el.attr('src', this.model.url).load(_.bind(function() {
            var iframe = this.$el.contents();
            iframe.find('.menubar').remove();
			iframe.find('.title-bar').remove();
        }, this));
        this.$el.toggle();
    }
});
