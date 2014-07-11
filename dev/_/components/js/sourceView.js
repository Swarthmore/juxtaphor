//Create a view for the source
AV.SourceView = Backbone.View.extend({
	el: '#view_container',

    initialize: function(){},
    
	render: function(){
		//compile the template using underscore
		var template = _.template( $("#view_template").html(), {
            source: this.model
        });
		//Load the compiled HTML into the backbone "el"
		this.$el.html( template );
        this.codeMirror = CodeMirror.fromTextArea(
            document.getElementById("viewContent"), 
            {
                theme: 'solarized dark',
                lineNumbers: true,
                viewportMargin: Infinity
            });
	},

	events: {
        "click #uploadButton": "upload",
        "click #newSourceButton": "newSource"
	    
    },
    upload: function( event ){
		//Resetting attached model, because if something was
        //looked at before the upload, that will still be in
        // the model.
	    this.model.clear().set(this.model.defaults);
        this.codeMirror.save();
	    this.model.save({
		    data: $("#viewContent").val(),
			name: $("#name").val()
			}).done(_.bind(function() {
				    this.collection.fetch();
				}, this));
	    this.render();
	},
    newSource: function(){
        console.log("New Source Button Clicked");
        this.render();
    }
});

