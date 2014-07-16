// Backbone routing used here to get visualizations 


test(arg){
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


PV.Router = Backbone.Router.extend({
  initialize: function(){

  },

  routes: {
    'viz/heatmap/:idToViz': 'heatMap',
    'viz/sidebyside/:idToViz': 'sideBySide'
  },
  sideBySide: function (idToVisualize) {

  },

  heatMap: function (idToVisualize) {


  }


});


var router = new PV.Router();
Backbone.history.start();
