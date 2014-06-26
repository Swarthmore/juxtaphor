AV.SourceCollectionView = Backbone.View.extend({
    el: '#list_container',
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
    },
    template: _.template( $("#list_template").html()),
    render: function () {
        console.log("Trying to render");
        this.$el.html(this.template({sources: this.collection.models}));
    }
});
