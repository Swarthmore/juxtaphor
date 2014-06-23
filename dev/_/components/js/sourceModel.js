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
