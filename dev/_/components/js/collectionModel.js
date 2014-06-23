//begin of the sources model...

function test(arg){
	var output = arg || 'fire';
	console.log(output);
}

var AV = {};
AV.SourcesCollection = Backbone.Collection.extend({
	model: AV.singleSource
});
