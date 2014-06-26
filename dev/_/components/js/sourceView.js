//Create a view for the source
AV.UploadSourceView = Backbone.View.extend({
	el: '#upload_container',	
	initialize: function(){},
	render: function(){
		//compile the template using underscore
		var template = _.template( $("#upload_template").html(), {} );
		//Load the compiled HTML into the backbone "el"
		this.$el.html( template );
	},
	events: {
        "click input[value=Upload]": "upload",
	    
    },
    upload: function( event ){
		//Using attached model...


        alert("Model name is..." + JSON.stringify(this.model.fetch()));



        this.model.set({name: $("#upload").val()});
		this.model.set({data: $("#uploadContent").val()});
		alert("Model name is..." + this.model.get("name") );
		this.model.save();

	}
});

AV.DestroySourceView = Backbone.View.extend({
	el: '#destroy_container',	
	initialize: function(){},
	render: function(){
		//compile the template using underscore
		var template = _.template( $("#destroy_template").html(), {} );
		//Load the compiled HTML into the backbone "el"
		this.$el.html( template );
	},
	events: {
        "click input[value=Destroy]": "destroy",
	    
    },
    destroy: function( event ){
	/*
        this.model.set({name: $("#destroy").val()});
		this.model.set({data: $("#uploadContent").val()});
		alert("Model name is..." + this.model.get("name") );
		this.model.save();
	}
});




       */ 
     }
});


