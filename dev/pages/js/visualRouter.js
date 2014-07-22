// Backbone routing used here to get visualizations 

/*
 * Basic wrapper for console.log
 */
function test(arg){
	var output = arg || 'fire';
	console.log(output);
}

var PV = {}

PV.Router = Backbone.Router.extend({
    initialize: function(){
        this.baseURL = 'http://54.88.3.200:8182/juxta/public/set/';
    },

    routes: {
        ':workspace/viz/heatmap/:idToViz': 'heatMap',
        'viz/sidebyside/:idToViz': 'sideBySide'
    },
    sideBySide: function (workspace, idToVisualize) {
        //render the sideBySide template
        //Create a model to fetch from server list of witnesses
        var URL = 'http://54.88.3.200:8182/juxta/' + workspace + "/set/" + idToVisualize + '/view?mode=sidebyside&condensed=true&docs=';

        //This model wraps the url and lets us use fetch
        var model = Backbone.Model.extend({
            url: this.baseURL+idToVisualize
        });

        var mod = new model();
        mod.fetch(
            {success: _.bind(function(){
                var ids = _.pluck(mod.get('witnesses'), 'id');
		        if (ids.length < 2){
                    console.log('ids.length < 2: ' + ids);
                }
                mod.url = mod.url +
                    '/view?mode=sidebyside&condensed=true&docs=' +
                    ids[0] + ',' + ids[1];
                $("#presentVis").attr('src', mod.url);
            }, this)
            });

        test("sideBySide");
    },

    heatMap: function (workspace, idToVisualize) {
        //render the heatMap template
        var URL = 'http://54.88.3.200:8182/juxta/' + workspace + "/set/" +
                idToVisualize + '/view?mode=heatmap&condensed=true';
        $("#presentVis").attr('src', URL);
    }


});


var router = new PV.Router();
Backbone.history.start();

