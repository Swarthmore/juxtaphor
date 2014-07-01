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

// Backbone.emulateJSON = true;

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
		this.transform = new AV.transform();
		this.witness = new AV.witness();
		this.witnesses = new AV.witnesses();
		this.set = new AV.set();
		this.collection = new Backbone.Collection([
			this.post,
			this.get,
			this.sources,
			this.put,
			this.delete,
			this.transform,
			this.witness,
			this.witnesses,
			this.set
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
		"click button#transform" : 'transform',
		"click button#get-witness" : 'getWTNS',
		"click button#get-witnesses" : 'getWTNSlist',
		"click button#delete-witness" : 'deleteWitness',
		"click button#create-set" : 'createSet'
	},
	render:function(){
		this.$el.html(
			'<ul>'
			+ '<li><button class="btn btn-success" id="post">post</button></li>'
			+ '<li><button class="btn btn-primary" id="get">get source</button></li>'
			+ '<li><button class="btn btn-primary" id="get-srcs">get sources</button></li>'
			+ '<li><button class="btn btn-warning" id="put">put</button></li>'
			+ '<li><button class="btn btn-danger" id="delete">delete</button></li>'
			+ '<li><button class="btn btn-success" id="transform">transform</button></li>'
			+ '<li><button class="btn btn-default" id="get-witness">get witness</button></li>'
			+ '<li><button class="btn btn-default" id="get-witnesses">get witnesses</button></li>'
			+ '<li><button class="btn btn-default" id="delete-witness">delete witness</button></li>'
			+ '<li><button class="btn btn-default" id="create-set">create set</button></li>'
			+ '</ul>');
		this.$el.find('ul li').css( {'list-style' : 'none', 'margin-bottom' : '5px' });
	},
	post:function(){

		test('post');
		this.collection.models[0].url = '/juxta/source';
		this.collection.models[0].save({
	
		name: 'post issue debug',
			type: 'raw',
			contentType: 'txt',
			data: 'some test what what'
		},
	{ 	success: function(e){ test('success'); },
	}	);
//		delayReload();
	},

	get:function(){test('get');
		this.collection.models[1].set({id : this.collection.models[1].id + '.json' })
		this.collection.models[1].fetch({
			success:function() { test('success');},
			error:function() { test('not so much');}
		});
	//	delayReload();
	},

	getSRCS:function(){test('get-srcs');
		test('get-ws');
		this.collection.models[2].fetch({
			success: function(e){ test('success'); },
			error: function(e){ test('error'); }
		});
	//	delayReload();
	},

	put:function(){test('put');

		this.collection.models[3].save(
			{
			id: '152',
			name: 'successful put',
			data: 'putted it really I did'
			}
		);

		//delayReload();
	},

	delete:function(){test('delete');
		this.collection.models[4].set({id : 23});
		this.collection.models[4].destroy();

		// delayReload();
	},

	transform: function(){
		test('transform');
		this.collection.models[5].save({

			source: 295,
			finalName: 'aefae witness'

		});
	},

	getWTNS: function(){
		test('get witness');
		this.collection.models[6].set({ id : 11 });
		this.collection.models[6].fetch({
			success: function(a,b,c) {  
				$('#log').append(JSON.stringify(b));
			}
		});
	},

	getWTNSlist: function(){
		test('get witnesses');
		this.collection.models[7].fetch();
	},

	deleteWitness: function(){

		test('delete witness')
		this.collection.models[6].set({ id : 11 });
		this.collection.models[6].destroy({

			success: function(a,b,c) {  
			$('#log').append(JSON.stringify(b));
			}

		});
	},

	createSet: function(){
		test('create set');
		this.collection.models[8].save({
				name: 'test set',
				witnesses: [12,13,14]
			},	
			{
			success: function(a,b,c) {  
				$('#log').append(JSON.stringify(b));
			}
		});
	},

});
AV.post = Backbone.Model.extend({
	url: '/juxta/source',
	sync: function(a,b,c){
		b.attributes = [b.attributes];
		return Backbone.sync.apply(this, [a,b,c]);
	}	
});


AV.get = Backbone.Model.extend({
	url: '/juxta/source/13.json'
});

AV.sources = Backbone.Model.extend({
	url: '/juxta/source.json'
});

AV.put = Backbone.Model.extend({
	urlRoot: '/juxta/source/152',
	defaults:{
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	},
	sync: function(a,b,c){
		test(c);
		b.attributes = [b.attributes];
		c.emulateJSON = true;
		c.contentType = false;
		c.processData = false;
		return Backbone.sync.apply(this, [a,b,c]);
	}	
});

AV.delete = Backbone.Model.extend({
	urlRoot: '/juxta/source',
	defaults:{ id: 8 }
	});

AV.transform = Backbone.Model.extend({

	url: '/juxta/transform',
	defaults: {
		source: '',
		finalName: ''
	}
});

AV.witness = Backbone.Model.extend({
	urlRoot: '/juxta/witness'
});

AV.witnesses = Backbone.Model.extend({
	url: '/juxta/witness.json'
});

AV.set = Backbone.Model.extend({
	url: '/juxta/set',
	defaults: {
		name: '',
		witnesses: []
	}
});

var readysetgo = new AV.routes();

$(function(){
  Backbone.history.start();
});
