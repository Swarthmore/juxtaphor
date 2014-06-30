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
        "click #uploadButton": "upload",
	    
    },
    upload: function( event ){
		//Using attached model...
        //alert("Model name is..." + JSON.stringify(this.model.fetch()));
        this.model.set({name: $("#upload").val()});
		this.model.set({data: $("#uploadContent").val()});
		//alert("Model name is..." + this.model.get("name") );
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
        "click #deleteButton": "destroy",
	    
    },
    destroy: function( event ){
	//DELETE MODEL
	AV.delete = Backbone.Model.extend({
		urlRoot: 'php/redirect.php/juxta/source',
		defaults: {id: $("#destroy").val(),},
	}); 
	test = new AV.delete();
	test.destroy();
	test.save();
     }
});

// This object ties in with the "edit_container" template
// in order to display a current version of the file
AV.EditSourceView = Backbone.View.extend({
    el: "#edit_container",
    template : _.template($("#edit_template").html()),
    render: function() {
        this.$el.html(this.template({source: this.model}));
    },
    events: {
        "click #submitEditButton": "submit"
    },
    submit: function() {
        var modelToSend = new AV.SourceModel();
        modelToSend.set({
            name: $("#editName").val(),
            data: $("#editContent").val(),
            id: this.model.get("id")
        });
        console.log(modelToSend);
        modelToSend.save();
    }
});
