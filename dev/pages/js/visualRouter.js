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

PV.Router = Backbone.Router.extend({
  initialize: function(){
    this.baseURL = 'http://54.88.3.200:8182/juxta/public/set/';
  },

  routes: {
    'viz/heatmap/:idToViz': 'heatMap',
    'viz/sidebyside/:idToViz': 'sideBySide'
  },
  sideBySide: function (idToVisualize) {
    //render the sideBySide template
    //Create a model to fetch from server list of witnesses
    var URL = this.baseURL + idToVisualize + '/view?mode=sidebyside&condensed=true&docs=';
    var mod = Backbone.Model.extend({
      url: this.baseURL+idToVisualize
    });
    test("Bout to fetch");
    mod.fetch(
             {success: _.bind(function(){
                 var ids = _.pluck(mod.get('witnesses'), 'id');
                  if (ids.length < 2){
                      console.log('ids.length < 2: ' + ids);
                  }
                  mod.url = mod.urlRoot + mod.id +
                     '/view?mode=sidebyside&condensed=true&docs=' +
                      ids[0] + ',' + ids[1];
                  $("#presentVis").attr('src', URL);
              }, this)
              }); 

    test("sideBySide");
  },

  heatMap: function (idToVisualize) {
    //render the heatMap template
    var URL = this.baseURL + idToVisualize + '/view?mode=heatmap&condensed=true';
    $("#presentVis").attr('src', URL);    
  }


});


var router = new PV.Router();
Backbone.history.start();

