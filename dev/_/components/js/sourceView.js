
AV.SourceView = Backbone.View.extend({
	initialize: function(){
		console.log("Source view init");
	},
	render: function(){
		//compile the template using underscore
		var template = _.template( $("#search_template").html(), {} );
		//Load the compiled HTML into the backbone "el"
		this.$el.html( template );
	},
	events: {
            "click input[type=button]": "doSearch"  
        },
        doSearch: function( event ){
        // Button clicked, you can access the element that was clicked with event.currentTarget
        	alert( "Search for " + $("#search_input").val() );
        }

});
var source_view = new SourceView();
 
