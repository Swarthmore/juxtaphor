AV.VisualizationModel = Backbone.Model.extend({
    urlRoot: 'http://54.88.3.200:8182' + AV.URL('set'),
    updateURL: function() {
        this.urlRoot = 'http://54.88.3.200:8182' + AV.URL('set');
    }
});


