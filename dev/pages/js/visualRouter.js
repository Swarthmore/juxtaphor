// Backbone routing used here to get visualizations 


function test(arg){
	var output = arg || 'fire';
	console.log(output);
}

function json_post(url,data,callback,flag){
	data = data || '';
	callback = callback || '';
	flag = flag || 'default';
	$.ajax({
		url: url,
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		success: callback,
		error: function(e){test(flag); test(e);}
	});
}
var PV = {}

test("yo1");
PV.Router = Backbone.Router.extend({
  initialize: function(){
    test("HELLLOO");
  },

  routes: {
    'viz/heatmap/:idToViz': 'heatMap',
    'viz/sidebyside/:idToViz': 'sideBySide'
  },
  sideBySide: function (idToVisualize) {
    //render the sideBySide template
    test("sideBySide");
  },

  heatMap: function (idToVisualize) {
    //render the heatMap template
    test("heatMap");	
  }


});


var router = new PV.Router();
Backbone.history.start();

