// AV.Router: Extends Backbone.Router for the AKHMATOVIZ Project
//
// -------------------------------------------------------------
// Most of our calls to all of the models and things should come from here.


AV.Router = Backbone.Router.extend({
    initialize: function() {
        this.sourceCollection = new AV.SourceCollection();
        this.sourceCollectionView = new AV.SourceCollectionView({collection:
                                                                 this.sourceCollection});
        this.sourceModel = new AV.SourceModel();
        this.uploadSourceView = new AV.UploadSourceView({model: this.sourceModel, 
				colView:this.sourceCollectionView});
        console.log("Initializing router");
    },
    
    routes: {
        '': 'index',
        'sources': 'sources',
        'source/upload/': 'upload',
    },
    
    sources: function () {
        this.sourceCollection.fetch({reset: true});
    },
    
    upload: function () {
        this.uploadSourceView.render();
    },
    destroy: function() {
        this.destroySourceView.render();
    },
    index: function() {
        this.upload();
        this.sources();
	
    },
});




