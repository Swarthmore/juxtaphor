AV.ComparisonSetCollectionView = Backbone.View.extend({
    el: '#list_set_container',
    initialize: function() {
        this.listenTo(this.collection, 'all', this.render);
        this.listenTo(Backbone, 'comparison:collate', this.refresh);
    },
    events: {
	    "click #deleteSetButton": "delete"
    },
    template: _.template( $("#list_set_template").html()),
    render: function () {
        this.$el.empty();
        this.$el.html(this.template({sets: this.collection.models}));
    },
    refresh: function(){
        console.log('potato');
        this.collection.fetch();
    },
    delete: function(ev) {
	    //ev is the mouse event. We receive the data-value which contains
	    //the id.
	    test("in delete in source collection"); 	    
	    var idToDelete = $(ev.target).data('value');
	    var sourceToRemove = this.collection.find(function (source) {
		    return source.id == idToDelete;});
	    sourceToRemove.urlRoot = '/juxta/set';
	    sourceToRemove.destroy();
	    
    }
});
