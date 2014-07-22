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
        console.log(this.model.get('name'));
        this.codeMirror = CodeMirror.fromTextArea(
            document.getElementById("viewContent"),
            {
                theme: 'solarized dark',
                lineNumbers: true,
                viewportMargin: Infinity,
                readOnly: this.model.get('name')
            });
	},

	events: {
        "click #uploadButton": "upload"
    },
    upload: function( event ){
		//Resetting attached model, because if something was
        //looked at before the upload, that will still be in
        // the model.

        var modelToSubmit = new AV.SourceModel();
        this.codeMirror.save();
	    // Saving the model sends a "sync" request.
        console.log($('#viewContent').val());
        console.log($('#name').val());
        modelToSubmit.set({
		    data: $("#viewContent").val(),
			name: $("#name").val()
			});
        console.log(this.model);
	    modelToSubmit.save().done(_.bind(function() {
				    this.collection.fetch();
				}, this));
	    this.render();
	}
});









