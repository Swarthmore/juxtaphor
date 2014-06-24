// Source Model
AV.Source = Backbone.Model.extend({
	url: 'php/redirect.php/source',
	defaults: {
		name: '',
		type: 'raw',
		contentType: 'txt',
		data: ''
	},
});
// Source Model Tests


// test_Source = new AV.Source({
//     name: 'The Wind and the Rain',
//     type: 'raw',
//     contentType: 'txt',
//     data: "When that I was and a little tiny boy, with a hey-ho, the wind and "+
//     the rain, a foolish thing was but a toy, for the rain it raineth every day."
// });
// alert('potato');
// test_Source.save( {
//         success: function () {
//             alert('success');
//         },
//         error: function(d){
//             alert('everything is terrible');
//         }       
//     });

// other_test = new AV.Source();
// other_test.url = 'php/redirect.php/Source/15';
// other_test.fetch();
// alert(other_test.name);

// Source Model End
