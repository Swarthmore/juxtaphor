//Create a view for the source
AV.SourceView = Backbone.View.extend({
	el: '#upload_container',	
	initialize: function(){

	},
    
	render: function(){
		//compile the template using underscore
		var template = _.template( $("#upload_template").html(), {
            source: this.model
        });
		//Load the compiled HTML into the backbone "el"
		this.$el.html( template );
        this.codeMirror = CodeMirror.fromTextArea(
            document.getElementById("uploadContent"), 
            {
                theme: 'solarized dark',
                lineNumbers: true
            });
	},

	events: {
        "click #uploadButton": "upload"
	    
    },
    upload: function( event ){
		//Resetting attached model, because if something was
        //looked at before the upload, that will still be in
        // the model.
	    this.model.clear().set(this.model.defaults);
        this.codeMirror.save();
	    this.model.save({
		    data: $("#uploadContent").val(),
			name: $("#upload").val()
			}).done(_.bind(function() {
				    this.collection.fetch();
				}, this));
	    this.render();
	    router.navigate('', true);
	}
});

