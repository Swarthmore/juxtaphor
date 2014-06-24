// witness model

AV.witness = Backbone.Model.extend({
	url: 'php/redirect.php/witness',
	defaults: {
		source: '',

		//TODO:there are some optional attributes we may need to add
	}
});

// end witness model
