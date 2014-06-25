AV.SourceCollectionView = Backbone.View.extend({
    el: '#list_container',
    initialize: function() {
        
    },
    render: function () {
        var sources = new AV.SourceCollection();
        sources.fetch({
            success: _.bind(function (sources) {
                var template = _.template( $("#list_template").html(), {sources: sources.models} );
                this.$el.html(template);
            }, this),
            error: function(a, b, c){console.log(a);console.log(b);console.log(c);}
        });
        console.log(sources.models);

    }
});
