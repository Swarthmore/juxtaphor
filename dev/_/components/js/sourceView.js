//Create a view for the source
AV.SourceView = Backbone.View.extend({
	el: '#view_container',
	checked: '',
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
                viewportMargin: Infinity,
                readOnly: this.model.get('name'),
            });

	var that = this;
	$('.CodeMirror').click(function(){
	  that.codeMirror.focus();
	  console.log("WORKING?");
	});
	},

	events: {
        "click #uploadButton": "upload",
	"click #contentType": "contentType"
    },
    upload: function( event ){
		//Resetting attached model, because if something was
        //looked at before the upload, that will still be in
        // the model.
        var modelToSubmit = new AV.SourceModel();
        modelToSubmit.updateURL();
        this.codeMirror.save();
	    // Saving the model sends a "sync" request.
        var contentType = (this.checked) ? 'xml' : 'txt';
	modelToSubmit.set({
		data: $("#viewContent").val(),
		name: $("#name").val(),
		contentType: contentType
		});
	modelToSubmit.save().done(_.bind(function() {
		this.collection.fetch();
		}, this));
	this.render();
	},

    contentType: function( event ){
	this.checked = $(event.target).prop('checked');
	console.log(this.checked);
	}
});
