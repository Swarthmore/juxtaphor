//RUNS after all the declarations
//Running the models
var sourceInstance = new AV.Source({
	name: 'default name...',
	type: 'raw',
	contentType: 'txt',
	data: "default..."
});
//attaching view to Model

var source_view = new AV.UploadSourceView({el: $("#upload_container"), model: sourceInstance });

var destroy_view = new AV.DestroySourceView({el: $('#destroy_container'), model: sourceInstance});


source_view.render();
destroy_view.render();

//clean up memory. Is this necessary?
sourceInstance.destroy({success: function(){
		console.log("model destroyed");
	},
	error: function(){
		console.log("failed destroy");
	}
});

var router = new AV.routes();

Backbone.history.start();
