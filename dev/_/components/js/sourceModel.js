// Source Model
AV.SourceModel = Backbone.Model.extend({
	urlRoot: '/juxta/source',
	defaults: {
		id: null,
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	},
	sync: function(a,b,c){
		b.attributes = [b.attributes];
		return Backbone.sync.apply(this, [a,b,c]);
        }
});
// Source Model End

