// Source Model
AV.source = Backbone.Model.extend({



	url: 'php/redirect.php/source',

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

test_source.save( {
        success: function () {
            alert('success');
        },
        error: function(d){
            alert('everything is terrible');
        }       
    });


// test_source = new AV.source({
//     name: 'The Wind and the Rain',
//     type: 'raw',
//     contentType: 'txt',
//     data: "When that I was and a little tiny boy, with a hey-ho, the wind and the rain, a foolish thing was but a toy, for the rain it raineth every day."
// });
// alert('potato');
// test_source.save( {
//         success: function () {
//             alert('success');
//         },
//         error: function(d){
//             alert('everything is terrible');
//         }       
//     });

other_test = new AV.source();
other_test.url = 'php/redirect.php/source/15';
other_test.fetch();




// Source Model End
