AV.ComparisonSetCollectionView = Backbone.View.extend({
    el: '#list_set_container',
    initialize: function() {
        this.listenTo(this.collection, 'reset remove sync', this.render);
        this.listenTo(Backbone, 'source:TEI', setTimeout(this.refresh, 1000));
        this.listenTo(Backbone, 'comparison:collate', this.refresh);
        this.listenTo(Backbone, 'source:deleted', this.reqDeleted);
        this.listenTo(Backbone, 'witness:deleted', this.reqDeleted);
    },
    events: {
	    "click #deleteSetButton": "delete"
    },
    template: _.template( $("#list_set_template").html()),
    render: function () {
        this.$el.empty();
        this.$el.html(this.template({sets: this.collection.models}));
        _.each(this.collection.models, function(model) {
		console.log(model.get('status'));
	    });
        // Fetch continuously until the comparison set is collated.
	    if (_.any(this.collection.models,
                  function(model){
                      return model.get('status') == 'TOKENIZING' ||
                             model.get('status') == 'TOKENIZED' ||
                             model.get('status') == 'COLLATING';
                  })){
            setTimeout(this.collection.fetch({reset: true}, 1000));
        }
    },
    reqDeleted: function(){
        console.log('thing deleted!');
        this.collection.fetch().done(_.bind(function(){
            var deletedModels = _.filter(
                this.collection.models,
                function(model){return model.get('status') == 'NOT_COLLATED';});
            _.map(deletedModels, function(model){
                //model.urlRoot(AV.URL('set'));
                model.url(AV.URL('set'));
                model.destroy();
            });
        }, this));
    },
    refresh: function(){
	console.log('comparison view refresh');
        this.collection.fetch({reset:true});
    },
    delete: function(ev) {
        //ev is the mouse event. The user clicked a DOM element,
        //whose data-value attribute is the ID of the Model to be deleted.

            $(".tooltip").hide();
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
