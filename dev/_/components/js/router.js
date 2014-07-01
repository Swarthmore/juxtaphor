// AV.Router: Extends Backbone.Router for the AKHMATOVIZ Project
// -------------------------------------------------------------
// Most of our calls to all of the models and things should come from here.

AV.wait = function(n) {
    if (n===0) {
        return 1;
    } else {
        return n * AV.wait(n-1);
    }
};

AV.Router = Backbone.Router.extend({
    initialize: function() {
        this.sourceModel = new AV.SourceModel();
        this.uploadSourceView = new AV.UploadSourceView(
            {model: this.sourceModel});
        this.viewSourceView = new AV.ViewSourceView({model:this.sourceModel});
        this.sourceCollection = new AV.SourceCollection();
        this.sourceCollectionView = new AV.SourceCollectionView(
            {collection:this.sourceCollection});
    },
    
    routes: {
        '': 'index',
        'sources': 'sources',
        'view/:idToView': 'view',
        'source/upload/': 'upload'
    },

    index: function() {
        this.sources();
    },
    
    sources: function () {
        this.sourceCollection.fetch({reset: true});
    },
    view: function(idToView) {
        this.sourceModel.set('id', idToView);
        this.sourceModel.url = this.sourceModel.urlRoot + 
                               this.sourceModel.id + '.json';
        this.sourceModel.fetch();
        this.viewSourceView.render();
    },
    upload: function () {
        this.uploadSourceView.render();
    }
});


