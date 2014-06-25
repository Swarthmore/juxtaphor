AV.SourceCollectionView = Backbone.View.extend({
    el: '#list_container',
    render: function () {
        var sources = new AV.SourceCollection();
        sources.fetch();
        alert(sources.models);
        var template = _.template( $("#list_template").html(), {sources: sources.models} );
        this.$el.html(template);
    }
});
