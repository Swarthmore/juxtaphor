//part of the model to represent witnesses

var AV = {};

AV.witness = Backbone.Model.extend({
	url: 'redirect.php',
	defaults: {
		source: '',

		//TODO:there are some optional attributes we may need to add
	}
});
