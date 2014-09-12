// Backbone routing used here to get visualizations 

/*
 * Basic wrapper for console.log
 */
function test(arg){
	var output = arg || 'fire';
	console.log(output);
}

var PV = { baseURL: ['http://54.88.3.200:8182', '/juxta/'] };

PV.Router = Backbone.Router.extend({
    initialize: function(){
        console.log("Initialize Router");
        var iFrame = $("#visualization");
        iFrame.load(_.bind(function(){
            if (!(iFrame.contents()[0].title)) {
                console.log("RENDERING it says");
                document.getElementById('visualization')
                    .contentWindow
                    .location
                    .reload(true);
            }
        }, this));
    },

    routes: {
        ':workspace/viz/heatmap/:idToViz': 'heatMap',
        ':workspace/viz/sidebyside/:idToViz': 'sideBySide'
    },
    sideBySide: function (workspace, idToVisualize) {
        //render the sideBySide template
        //Create a model to fetch from server list of witnesses
        var URL = PV.baseURL[0] + PV.baseURL[1] + workspace + "/set/" + idToVisualize + '/view?mode=sidebyside&condensed=true&docs=';
        console.log("Rendering side-by-side " + URL);

        //This model wraps the url and lets us use fetch
        var model = Backbone.Model.extend({
            url: PV.baseURL[0] + PV.baseURL[1] + workspace + "/set/" + idToVisualize
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
                $("#visualization").attr('src', mod.url);
		this.showURL();

            }, this)
            });
    },

    heatMap: function (workspace, idToVisualize) {
        //render the heatMap template
        var URL = PV.baseURL[0] + PV.baseURL[1] + workspace + "/set/" +
                idToVisualize + '/view?mode=heatmap&condensed=true';
        console.log("rendering heatMap: " + URL);
        $("#visualization").attr('src', URL);
	this.showURL();
	
    },

    showURL: function() {
	
        var vizURL = PV.baseURL[0] + window.location.pathname + '#' + Backbone.history.fragment;
	console.log('showURL: ' + vizURL);
        $('footer pre').text(vizURL);

    }
});

var router = new PV.Router();
Backbone.history.start();
