AV.SourceCollectionView = Backbone.View.extend({
    el: '#list_container',
    initialize: function() {
        this.listenTo(this.collection, 'all', this.render);
        console.log("Initialize View");
    },
    events: {
	"click #deleteButton": "delete",
	//"click #uploadButton": "upload",
    },
    template: _.template( $("#list_template").html()),
    render: function () {
        this.$el.empty();
        console.log("Trying to render");
        this.$el.html(this.template({sources: this.collection.models}));	
    },

    delete: function(ev) {
	    //ev is the mouse event. We receive the data-value which contains
	    //the id.
	    test("in delete in source collection"); 	    
	    var idToDelete = $(ev.target).data('value');
	    var sourceToRemove = this.collection.find(function (source) {
		    return source.id == idToDelete;});
	    sourceToRemove.urlRoot = 'php/redirect.php/source/';
	    sourceToRemove.destroy();
	    
    },
    upload: function(ev) {

	uploadModel = new AV.SourceModel({name: $("#upload").val(), data: $("#uploadContent").val()});
	uploadModel.save();

    },

});
