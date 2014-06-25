// whatever javascript files you place in this iFEF `folder will be concatenated to a single file in the js library

function test(arg){
	var output = arg || 'fire';
	console.log(output);
}

function delayReload(){
	setTimeout(function(){
		location.reload(true);
	},1000);
}

var AV = {};


AV.routes = Backbone.Router.extend({

	routes: {
		'': 'index',
	},

	initialize:function(){
		test('init');
		this.post = new AV.post();
		this.get = new AV.get();
		this.sources = new AV.sources();
		this.put = new AV.put();
		this.delete = new AV.delete();
		this.collection = new Backbone.Collection([
			this.post,
			this.get,
			this.sources,
			this.put,
			this.delete
			]);
		this.testerView = new AV.testerView({collection: this.collection});
	},

	index: function() { 
		this.testerView.render();
	},

});

AV.testerView = Backbone.View.extend({

	el: '#verb-tests',
	initialize: function(){},
	events: { 
		"click button#post" : 'post',
		"click button#get" : 'get',
		"click button#get-srcs" : 'getSRCS',
		"click button#put" : 'put',
		"click button#delete" : 'delete',
		"click button#clear" : 'clear'
	},
	render:function(){
		this.$el.html(
			'<ul>'
			+ '<li><button class="btn btn-success" id="post">post</button></li>'
			+ '<li><button class="btn btn-primary" id="get">get source</button></li>'
			+ '<li><button class="btn btn-primary" id="get-srcs">get sources</button></li>'
			+ '<li><button class="btn btn-warning" id="put">put</button></li>'
			+ '<li><button class="btn btn-danger" id="delete">delete</button></li>'
			+ '<li><button class="btn btn-default" id="clear">clear</button></li>'
			+ '</ul>');
		this.$el.find('ul li').css( {'list-style' : 'none', 'margin-bottom' : '5px' });
	},
	post:function(){

		test('post');
		this.collection.models[0].save({
			name: 'continuing the tests',
			data: 'good one'
		},
		{
			success:function() { test('success');},
			error:function(a,b,c) { test(a); test(b); test(c);}
		});
		delayReload();
	},

	get:function(){test('get');
		this.collection.models[1].fetch({
			success:function() { test('success');},
			error:function() { test('not so much');}
		});
		delayReload();
	},

	getSRCS:function(){test('get-srcs');
		test('get-ws');
		this.collection.models[2].fetch();
		delayReload();
	},

	put:function(){test('put');},

	delete:function(){test('delete');},

	clear:function(){
		$.post('../../php/redirect.php?clear=1', function() { test('clear'); });
		location.reload(true);
	}
});

AV.post = Backbone.Model.extend({
	url: '../../php/redirect.php/juxta/source',

	defaults:{
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	}
});

AV.get = Backbone.Model.extend({
	url: '../../php/redirect.php/juxta/source/13.json'
});

AV.sources = Backbone.Model.extend({
	url: '../../php/redirect.php/juxta/source.json'
});

AV.put = Backbone.Model.extend({});

AV.delete = Backbone.Model.extend({});

var readysetgo = new AV.routes();

$(function(){
  Backbone.history.start();
});
