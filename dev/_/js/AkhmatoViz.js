

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
		test("Inside index");
		this.model = new AV.model();
		this.model.set({
			name: 'greatest title2',
			data: 'poem is poem is a poem is a poem. Poem is a poem.'
		});
		test("before the save");
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
	url: 'redirect.php',
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


// Source Model
AV.source = Backbone.Model.extend({
	url: 'redirect.php',
	defaults: {
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	}
});
// Source Model End


// test scripts
// end test scripts



var AV = {};

AV.witness = Backbone.Model.extend({
	url: 'redirect.php',
	defaults: {
		source: '',
	}
});
