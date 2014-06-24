// Source Model
AV.source = Backbone.Model.extend({
	url: 'php/redirect.php#source',
	defaults: {
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	},
   
});
// Source Model Tests

test_source = new AV.source({
    name: 'Potato Chips',
    type: 'raw',
    contentType: 'txt',
    data: "No matter where it is, you'll always find a bag around. At a bar, or"+
         " a picnic. Even a baseball ground!"
});
console.log('do a thing');
test_source.save( {
        success: function () {
            alert('success');
        },
        error: function(d){
            alert('everything is terrible');
        }       
    });

// Source Model End
