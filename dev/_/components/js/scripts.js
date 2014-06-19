// whatever javascript files you place in this iFEF `folder will be concatenated to a single file in the js library

function test(arg){
	var output = arg || 'fire';
	console.log(output);
}

Backbone.emulateHTTP = true;
var AV = {};


AV.routes = Backbone.Router.extend({

	routes: {
		'': 'index'
	},
	initialize:function(){
		test('init');
	},
	index: function(){
		test("Inside index");
		this.model = new AV.model(
		{
			name: 'test',
			type: 'txt',
			content: 'test'
		});
		this.model.save({
			success:function(d){
				test('success');
			},
			error:function(d){
				test('error');
			}
		});	
	}
});

AV.model = Backbone.Model.extend({
	url: 'http://54.88.3.200:8182/juxta/source',
	name: '',
	type: '',
	content: ''
});

AV.view = Backbone.View.extend({});

var readysetgo = new AV.routes();

$(function(){
  Backbone.history.start(); 
});