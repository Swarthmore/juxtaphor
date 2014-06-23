//Create a view for the source
//TODO get view to display in index.html
AV.SourceView = Backbone.View.extend({
	initialize: function(){
		console.log("Source view init");
	}

});
//this sets our view's "el" property to div#search_container
var source_view = new SourceView({el: $("#search_container")});
 
