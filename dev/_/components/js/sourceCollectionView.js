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
	    //listen for sync events in the source collection
        this.listenTo(this.collection, 'sync', this.render);
    },
    events: {
	    "click #deleteSourceButton": "delete",
        "click #uploadButton": "refresh",
        "click #transformButton": "transform"
    },
    template: _.template( $("#list_source_template").html()),
    render: function (event) {
        this.$el.empty();
        this.$el.html(this.template({sources: this.collection.models}));
    },
    refresh: function() {
        this.collection.updateURL();
        this.collection.fetch();
    },
    delete: function(ev) {
	    //ev is the mouse event. We receive the data-value which contains
	    //the id.
	    var idToDelete = $(ev.currentTarget).data('value');
	    var sourceToRemove = this.collection.find(function (source) {
		    return source.id == idToDelete;});
	    sourceToRemove.urlRoot = AV.URL('source');
	    sourceToRemove.destroy().done(
            _.bind(function(){
                this.collection.fetch();
                Backbone.trigger("source:deleted");
            }, this));

    },
    transform: function(ev){
        var checkedBoxes = _.filter($('input:checkbox.transformCheckbox'),
                                    function (box) {return box.checked === true;});
        var checkedIDs = _.pluck(checkedBoxes, 'value');
        _.forEach(checkedIDs, function(id) {
	        var url = '../..' + AV.URL('transform');
	        var request = { source: id };
	        //We use AJAX to send the request directly from here.
	        $.ajax({
		        type: 'POST',
		        url: url,
		        data: JSON.stringify(request),
		        contentType: 'application/json'
            }).done(function(){Backbone.trigger("source:transformed");});
        });
        this.collection.fetch();
    }
});
