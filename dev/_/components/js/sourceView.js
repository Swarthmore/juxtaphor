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
		this.model.save({
			data: $("#uploadContent").val(),
			name: $("#upload").val()
		},
		{
			success: function() { test('successful post'); },
		  	error: function() { test('errorful post'); }
		});
		/*this.model.save({success: _.bind(function() { 
			this.collection.fetch();
			test("andrew");
		}, this),
		error: test("ERRORRRR")});*/
		// this.model.save().done(function() {alert("SAVED");});
		test(this.collection.fetch());
		
		test("ben");
	        this.render();
	}
});

// This object ties in with the "view_container" template
// in order to display a current version of the file
AV.ViewSourceView = Backbone.View.extend({
    el: "#view_container",
    template : _.template($("#view_template").html()),
    render: function() {
        console.log("About to render");
        console.log(this.model);
        console.log(this.model.attributes);
        this.$el.html(this.template({source: this.model}));
    }
});

