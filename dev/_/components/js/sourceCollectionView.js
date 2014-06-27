AV.SourceCollectionView = Backbone.View.extend({
    el: '#list_container',
    initialize: function() {
        this.listenTo(this.collection, 'all', this.render);
        console.log("Initialize View");
    },
    template: _.template( $("#list_template").html()),
    render: function () {
        this.$el.empty();
        console.log("Trying to render");
        this.$el.html(this.template({sources: this.collection.models}));	
    },




});
