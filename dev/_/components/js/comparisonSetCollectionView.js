AV.ComparisonSetCollectionView = Backbone.View.extend({
    el: '#list_set_container',
    initialize: function() {
        this.listenTo(this.collection, 'reset remove', this.render);
        this.listenTo(Backbone, 'comparison:collate', this.refresh);
        this.listenTo(Backbone, 'source:deleted', this.refresh);
        this.listenTo(Backbone, 'witness:deleted', this.refresh);
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
                             model.get('status') == 'COLLATING';
                  })){
            this.collection.fetch({reset: true});
        }
    },
    refresh: function(){
        this.collection.fetch({reset:true});
    },
    delete: function(ev) {
	    //ev is the mouse event. We receive the data-value which contains
	    //the id.
	    var idToDelete = $(ev.currentTarget).data('value');
	    var sourceToRemove = this.collection.find(function (source) {
		    return source.id == idToDelete;});
	    sourceToRemove.urlRoot = AV.URL('set');
	    sourceToRemove.destroy().done(
            _.bind(function(){
                this.collection.fetch({reset: true});
            }, this));
    }
});
