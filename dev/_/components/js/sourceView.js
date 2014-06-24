//Create a view for the source
AV.SourceView = Backbone.View.extend({
        el: '#search_container',	
	initialize: function(){},
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
       // Button clicked, you can access the element that was clicked with 
       // event.currentTarget
        	alert( "Search for " + $("#search_input").val() );
        }

});
//this sets our view's "el" property to div#search_container
var source_view = new AV.SourceView({el: $("#search_container")});
source_view.render();
