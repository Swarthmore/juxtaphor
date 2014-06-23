
var AV = {};

AV.witness = Backbone.Model.extend({
	url: 'redirect.php',
	defaults: {
		source: '',
	}
});
