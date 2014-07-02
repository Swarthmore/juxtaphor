AV.WitnessCollectionView = Backbone.View.extend({
    el: '#list_witness_container',
    initialize: function() {
        console.log('initialize witnessCollectionView');
        this.listenTo(this.collection, 'all', this.render);
    },
    events: {
	    "click #deleteWitnessButton": "delete",
        "click #collateButton": "collate"
    },
    template: _.template( $("#list_witness_template").html()),
    render: function () {
        console.log("begin render witness collection view");
        this.$el.empty();
        this.$el.html(this.template({witnesses: this.collection.models}));	
        console.log("end render witness collection view");
    },
    delete: function(ev) {
	    //ev is the mouse event. We receive the data-value which contains
	    //the id.
	    test("in delete in source collection"); 	    
	    var idToDelete = $(ev.target).data('value');
	    var sourceToRemove = this.collection.find(function (source) {
		    return source.id == idToDelete;});
	    sourceToRemove.urlRoot = '/juxta/witness';
	    sourceToRemove.destroy();
	    
    },
    collate: function(ev) {
        var checkedBoxes = _.filter($('input:checkbox.witnessCheckbox'), 
                                    function(box)
                                    {return box.checked === true;});
        var checkedIDs = _.pluck(checkedBoxes, 'value');
        checkedIDs = _.map(checkedIDs, Number);


        var givenName = $('#collationNameField')[0].value;

        $.ajax({
            url: "/juxta/set.json",
            type: "POST",
            data: JSON.stringify({name:givenName, witnesses:checkedIDs}),
            contentType: 'application/json',
            success: function (response, status, jqXHR) {
                console.log(response);
            }
        });

    }
});
