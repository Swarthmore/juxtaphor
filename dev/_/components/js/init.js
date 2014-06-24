// whatever javascript files you place in this iFEF `folder will be concatenated to a single file in the js library

function test(arg){
	var output = arg || 'fire';
	console.log(output);
}

var AV = {};



AV.model = Backbone.Model.extend({
	url: 'php/redirect.php',
	defaults: {
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	}
});

AV.view = Backbone.View.extend({});

var readysetgo = new AV.routes();

$(function(){
  Backbone.history.start();
});
