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
        this.listenTo(this.collection, 'all', this.render);
    },
    events: {
	    "click #deleteSourceButton": "delete",
        "click #uploadButton": "refresh"
    },
    template: _.template( $("#list_source_template").html()),
    render: function () {
        this.$el.empty();
        this.$el.html(this.template({sources: this.collection.models}));	
    },
    refresh: function() {
        this.collection.fetch();
    },
    delete: function(ev) {
	    //ev is the mouse event. We receive the data-value which contains
	    //the id.
	    var idToDelete = $(ev.target).data('value');
	    var sourceToRemove = this.collection.find(function (source) {
		    return source.id == idToDelete;});
	    sourceToRemove.urlRoot = '/juxta/source';
	    sourceToRemove.destroy().done(_.bind(function(){this.render();}, this));
    }
});
