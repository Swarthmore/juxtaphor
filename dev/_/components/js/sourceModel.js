// Source Model
AV.SourceModel = Backbone.Model.extend({
	url: 'php/redirect.php/source',
	defaults: {
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	},
});
// Source Model End

