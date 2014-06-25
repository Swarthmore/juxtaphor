//RUNS after all the declarations
//Running the models
var source1 = new AV.Source({
	name: 'default name...',
	type: 'raw',
	contentType: 'txt',
	data: "default..."
});
//attaching view to Model
var source_view = new AV.UploadSourceView({el: $("#search_container"), model: source1 });

var destroy_view = new AV.DestroySourceView({el: $('#destroy_container'), model: source1});

source1.save();

source_view.render();

source1.destroy({success: function(){
		console.log("model destroyed");
	},
	error: function(){
		console.log("failed destroy");
	}
});

//console.log("INSIDE OF THE MAIN!");
