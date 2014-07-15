AV.ComparisonSetCollectionView = Backbone.View.extend({
    el: '#list_set_container',
    initialize: function() {
        this.listenTo(this.collection, 'reset remove', this.render);
        this.listenTo(Backbone, 'comparison:collate', this.refresh);
    },
    events: {
	    "click #deleteSetButton": "delete"
    },
    template: _.template( $("#list_set_template").html()),
    render: function () {
        this.$el.empty();
        this.$el.html(this.template({sets: this.collection.models}));
        if (_.any(this.collection.models,
                  function(model){
                      return model.get('status') == 'TOKENIZING' || 
                             model.get('status') == 'TOKENIZED' ||
                             model.get('status') == 'COLLATING';})){
            this.refresh();
        }
    },
    refresh: function(){
        console.log("Refreshing");
        this.collection.fetch({reset: true});
    },
    delete: function(ev) {
	    //ev is the mouse event. We receive the data-value which contains
	    //the id.
	    var idToDelete = $(ev.currentTarget).data('value');
	    var sourceToRemove = this.collection.find(function (source) {
		    return source.id == idToDelete;});
	    sourceToRemove.urlRoot = '/juxta/set';
	    sourceToRemove.destroy().done(_.bind(function(){this.refresh();}, this));
        console.log("You euthanized your Weighted Companion Collection Set" +
                    " faster than any test subject on record." +
                    " Congratulations.");

    }
});
