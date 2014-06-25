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
            "click input[type=button]": "upload"  
        },
        upload: function( event ){
		//Using attached model...
        	this.model.set({name: $("#search_input").val()});
		alert("Model name is..." + this.model.get("name") );
	}

});
