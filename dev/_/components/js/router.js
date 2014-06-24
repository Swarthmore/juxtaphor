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
			name: 'no glue in the media center',
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
