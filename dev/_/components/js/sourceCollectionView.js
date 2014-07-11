////////////////////////////////////////////////////////////////////
// SourceCollectionView displays all of the sources available     //
// on the Juxta server and displays them in a compelling way.     //
//                                                                //
// It allows the user to delete sources, view individual sources, //
// and convert sources into witnesses.                            //
////////////////////////////////////////////////////////////////////

AV.SourceCollectionView = Backbone.View.extend({
    el: '#list_source_container',
    initialize: function() {
        this.listenTo(this.collection, 'sync', this.render);
    },
    events: {
	    "click #deleteSourceButton": "delete"
    },
    template: _.template( $("#list_source_template").html()),
    render: function (event) {
        this.$el.empty();
        console.log("Rendered");
        this.$el.html(this.template({sources: this.collection.models}));	
    	test(event);
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
