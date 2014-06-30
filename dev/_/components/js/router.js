// AV.Router: Extends Backbone.Router for the AKHMATOVIZ Project
// -------------------------------------------------------------
// Most of our calls to all of the models and things should come from here.


AV.Router = Backbone.Router.extend({
    initialize: function() {
        this.sourceModel = new AV.SourceModel();
        this.uploadSourceView = new AV.UploadSourceView(
            {model: this.sourceModel});
        this.destroySourceView = new AV.DestroySourceView(
            {model: this.sourceModel});
        this.editSourceView = new AV.EditSourceView({model:this.sourceModel});
        this.sourceCollection = new AV.SourceCollection();
        this.sourceCollectionView = new AV.SourceCollectionView(
            {collection:this.sourceCollection});
        console.log("Initializing router");
    },
    
    routes: {
        '': 'index',
        'sources': 'sources',
        'source/upload/': 'upload',
        'source/destroy/': 'destroy',
    },
    
    sources: function () {
        this.sourceCollection.fetch({reset: true});
    },
    
    upload: function () {
        this.uploadSourceView.render();
    },
    index: function() {
        this.sources();
    }
});
