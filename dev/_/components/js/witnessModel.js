// Witness Model
// Seeks to implement the ``witness'' class in the Juxta api.
// Should be able to GET a list of witnesses
//                   DELETE a particular witness
//                   PUT a new name on a witness
//                   and POST to copy settings between witnesses.


AV.witness = Backbone.Model.extend({
	url: AV.URL('witness'),
	defaults: {
		source: '',
		xslt: '',
		finalName: ''
	},
    updateURL: function() {
        this.url = AV.URL('witness');
    }
});

// end witness model
