// Source Model
AV.SourceModel = Backbone.Model.extend({
	urlRoot: '/juxta/source',
	sync: function(a,b,c){
		b.attributes = [b.attribnutes];
		return Backbone.sync.apply(this, [a,b,c]);
		},
	defaults: {
		id: null,
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	}
});
// Source Model End

