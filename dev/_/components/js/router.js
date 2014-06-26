AV.routes = Backbone.Router.extend({
    initialize: function() {
        this.sourceCollection = new AV.SourceCollection();
        this.sourceCollectionView = new AV.SourceCollectionView({collection:
                                                                 this.sourceCollection});
        console.log("Initializing router");
    },
    
    routes: {
        'sources': 'sources'
    },
    
    sources: function () {
        this.sourceCollection.fetch();
    }
});




