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
		//Using attached model...

        

        	this.model.set({name: $("#upload").val()});
		this.model.set({data: $("#uploadContent").val()});
		alert("Model name is..." + this.model.get("name") );
		this.model.save();
    
	}




});

