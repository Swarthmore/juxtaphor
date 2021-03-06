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
        this.listenTo(Backbone, 'source:TEI', this.refresh);
    },
    events: {
        "click #deleteSourceButton": "delete",
        "click #uploadButton": "refresh",
        "click #transformButton": "transform",
        "click #teiView": "teiView"
    },
    template: _.template( $("#list_source_template").html()),
    render: function (event) {
        this.$el.empty();
        this.$el.html(this.template({sources: this.collection.models}));
	console.log(this.collection.models);
    },
    refresh: function() {
        this.collection.updateURL();
        this.collection.fetch();
    },
    delete: function(ev) {
        //ev is the mouse event. The user clicked a DOM element,
        //whose data-value attribute is the ID of the Model to be deleted.

           // (".tooltip").hide();
	var idToDelete = $(ev.currentTarget).data('value');
	var sourceToRemove = this.collection.find(function (source) {
	return source.id == idToDelete;});
	sourceToRemove.urlRoot = AV.URL('source');
	sourceToRemove.destroy().done(
	_.bind(function(){
	this.collection.fetch();
	// Backbone.trigger passes message between views
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
		}).done(function(){
		// Backbone.trigger passes message between views
		Backbone.trigger("source:transformed");
            });
        });
        this.collection.fetch();
    },
    teiView: function(ev){
	var teiID = $(ev.currentTarget).data('value');
	console.log(teiID);
	router.navigate('viz/tei/'+teiID,{trigger: true});	
    }
});
