// Source Model
AV.source = Backbone.Model.extend({
	url: 'php/redirect.php',
	defaults: {
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	}
});
<<<<<<< HEAD
=======
// Source Model Tests

test_source = new AV.source({
    name: 'Potato Chips',
    type: 'raw',
    contentType: 'txt',
    data: "No matter where it is, you'll always find a bag around. At a bar, or"+
         " a picnic. Even a baseball ground!"
});

test_source.save( {
        success: function () {
            alert('success');
        },
        error: function(d){
            alert('everything is terrible');
        }       
    });

>>>>>>> 64736477650750b47ab5e1a6fe2658181b9c130d
// Source Model End
