// Sources Collection JS File

function test(arg){
	var output = arg || 'fire';
	console.log(output);
}

var AV = {};
AV.SourcesCollection = Backbone.Collection.extend({
	model: AV.singleSource
});

// End Sources COllection JS File
