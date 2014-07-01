// Witness Model
// Seeks to implement the ``witness'' class in the Juxta api.
// Should be able to GET a list of witnesses
//                   DELETE a particular witness
//                   PUT a new name on a witness
//                   and POST to copy settings between witnesses.


AV.witness = Backbone.Model.extend({
	url: 'php/redirect.php/witness',
	defaults: {
		sourceId: '',
		title: '',
		description: '',
		source: '',
		author: '',
		date: '',
		notes: ''
	}
});

// end witness model
