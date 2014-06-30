//Create a view for the source
AV.UploadSourceView = Backbone.View.extend({
	el: '#upload_container',	
	initialize: function(){
		//this.listenTo(this.model, 'all', this.render);
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
		this.model.set({data: $("#uploadContent").val()});
		/*this.model.save({success: _.bind(function() { 
			this.collection.fetch();
			test("andrew");
		}, this),
		error: test("ERRORRRR")});*/
		this.model.save().done(function() {alert("SAVED");});
		test(this.collection.fetch());
		
		test("ben");
	        this.render();
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

