AV.SourceXMLModel = Backbone.Model.extend ({

	urlRoot: AV.URL('source'),
	defaults: {
		isPS: ''
	},
	updateURL: function() {
		this.urlRoot = AV.URL('source');
		console.log("current xml url root: " + this.urlRoot);
	}
});
