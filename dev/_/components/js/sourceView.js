//Create a view for the source
//added buttons, listeners, events for uploading both xml and parallel segmented TEI
AV.SourceView = Backbone.View.extend({
	el: '#view_container',
	// two convenience constants for passing  checkbox value
	contentType: '',
	parallelSeg: '',
	//convenience constant for setting lineWrapping	
	lineWrap: false,

	render: function(){
	  //compile the template using underscore
	  var template = _.template( $("#view_template").html(), {
	    source: this.model
	  });
	  //Load the compiled HTML into the backbone "el"
	  this.$el.html( template );
	  //console.log(document.getElementById("viewContent"));

	  this.codeMirror = CodeMirror.fromTextArea(
	    document.getElementById("viewContent"),
	    {
	      theme: 'solarized dark',
	      lineNumbers: true,
	      viewportMargin: Infinity,
	      readOnly: this.model.get('name'),
	      lineWrapping: this.lineWrap 
	    });



	  var that = this;
	  $('.CodeMirror').click(function(){
	    that.codeMirror.focus();
	  });
	},

	events: {
	  "click #uploadButton": "upload",
	  "click #contentType": "setContentType",
	  "click #parallelSeg": "setParallelSeg",
	  "click #lineWrapToggle": "toggle"
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
	modelToSubmit.save().done(_.bind(function(d) {
		// if the parallel segmentation is checked, create appopriate witnesses and collections
		if (this.setParallelSeg)  {
			var data = {setName: modelToSubmit.get('name'), teiSourceId: d};
			json_post(AV.URL('import'),data);
		}
		this.collection.fetch();
		}, this));
	this.render();
	},

    setContentType: function( event ){
      this.contentType = $(event.target).prop('checked');
      console.log(this.contentType);
    },

    setParallelSeg: function( event ){
      this.parallelSeg = $(event.target).prop('checked');
      console.log(this.parallelSeg);
    },
    
    /*
     * toggle the line wrap. Also updates button value to on or off
     */
    toggle: function( event ){

      var onOff = "";      
      if(!this.lineWrap){
	onOff = "On";
	this.lineWrap = true;
      } else {
	onOff = "Off";
	this.lineWrap = false;
      }
      this.codeMirror.setOption("lineWrapping", this.lineWrap);
      $("#lineWrapToggle").attr("value", "Line Wrap "+onOff);
    }

});
