AV.SourceCollectionView = Backbone.View.extend({
    el: '#list_source_container',
    initialize: function() {
        this.listenTo(this.collection, 'all', this.render);
    },
    events: {
	    "click #deleteSourceButton": "delete"
    },
    template: _.template( $("#list_source_template").html()),
    render: function () {
        this.$el.empty();
        console.log("Rendered");
        this.$el.html(this.template({sources: this.collection.models}));	
    	test();
    },
    delete: function(ev) {
	    //ev is the mouse event. We receive the data-value which contains
	    //the id.
	    test("in delete in source collection"); 	    
	    var idToDelete = $(ev.target).data('value');
	    var sourceToRemove = this.collection.find(function (source) {
		    return source.id == idToDelete;});
	    sourceToRemove.urlRoot = '/juxta/source';
	    sourceToRemove.destroy();
	    
    }
});
