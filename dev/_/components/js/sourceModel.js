// Source Model
AV.SourceModel = Backbone.Model.extend({
	url: 'php/redirect.php/source',
	defaults: {
		id: null,	
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	},
});
// Source Model End

