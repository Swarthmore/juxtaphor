AV.routes = Backbone.Router.extend({
    routes: {
        "list": "list"
    },
    list: function () {
        // This creates a new source collection view every single time.
        // This is necessary right now, because of how grunt's putting together
        // all of our javascript files.
        var sourceCollectionView = new AV.SourceCollectionView();
        sourceCollectionView.render();
    }
});




