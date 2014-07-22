/////////////////////////////////////////////////////////////////
// WitnessCollectionView displays all of the sources available //
// on the Juxta server, and allows the user to delete and      //
// collate them.                                               //
/////////////////////////////////////////////////////////////////

AV.WitnessCollectionView = Backbone.View.extend({
    el: '#list_witness_container',
    initialize: function() {
        this.listenTo(this.collection, 'all', this.render);
        this.listenTo(Backbone, "source:transformed", this.refresh);
        this.listenTo(Backbone, "source:deleted", this.refresh);

    },
    events: {
	    "click #deleteWitnessButton": "delete",
        "click #collateButton": "collate"
    },
    template: _.template( $("#list_witness_template").html()),
    render: function () {
        this.$el.empty();
        this.$el.html(this.template({witnesses: this.collection.models}));
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
	    sourceToRemove.urlRoot = AV.URL('witness');
	    sourceToRemove.destroy();

    },
    collate: function(ev) {
        var checkedBoxes = _.filter($('input:checkbox.witnessCheckbox'),
                                    function(box)
                                    {return box.checked === true;});
        var checkedIDs = _.pluck(checkedBoxes, 'value');
        checkedIDs = _.map(checkedIDs, Number);


        var givenName = $('#collationNameField')[0].value;

        //We spent a lot of time on the following. It submits the witnesses
        //together as a set, and then takes the set ID that is returned
        //from that, and collates it.
        $.ajax({
            url: AV.URL('set.json'),
            type: "POST",
            data: JSON.stringify({name:givenName, witnesses:checkedIDs}),
            contentType: 'application/json',
            dataType: 'text'
        }).done(_.bind(function(d){
            this.model.set({id:d});
            this.model.collate();
        }, this));
        this.collection.fetch();
    }
});
