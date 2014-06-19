// whatever javascript files you place in this iFEF `folder will be concatenated to a single file in the js library

function test(arg){
	var output = arg || 'fire';
	console.log(output);
}

var AV = {};


AV.routes = Backbone.Router.extend({

	routes: {
		'': 'index'
	},
	initialize:function(){
		test('init');
	},
	index: function(){
		this.model = new AV.model();
		this.model.save();	
	}
});

AV.model = Backbone.Model.extend({
	url: 'localhost:8182/juxta/source',

	data:{
		
	}
});

AV.view = Backbone.View.extend({});

var readysetgo = new AV.routes();

$(function(){
  Backbone.history.start(); 
});


// test scripts
