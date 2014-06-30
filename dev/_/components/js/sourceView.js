//Create a view for the source
AV.UploadSourceView = Backbone.View.extend({
	el: '#upload_container',	
	initialize: function(){
		this.listenTo(this.model, 'all', this.render);
	},

	render: function(){
		//compile the template using underscore
		var template = _.template( $("#upload_template").html(), {} );
		//Load the compiled HTML into the backbone "el"
		this.$el.html( template );
	},

	events: {
        "click #uploadButton": "upload",
	    
    	},
    	upload: function( event ){
		//Using attached model...
        	//alert("Model name is..." + JSON.stringify(this.model.fetch()));
        	this.model.set({name: $("#upload").val()});
		this.model.set({data: $("#uploadContent").val()});
		this.model.save();
		
	}
});

