AV.SourceCollectionView = Backbone.View.extend({
    el: '#list_container',
    initialize: function() {
        this.listenTo(this.collection, 'all', this.render);
    },
    template: _.template( $("#list_template").html()),
    render: function () {
        console.log("Trying to render");
        this.$el.html(this.template({sources: this.collection.models}));
    },
    events: {
	"click input[value=Delete]": "Delete",
},

Delete: function( event ){
	console.log("This is working");
	this.model.set({name: prompt("I hope this works")});
	alert("Model name is..." + this.model.get('name'));
	this.model.save();	

},

});
