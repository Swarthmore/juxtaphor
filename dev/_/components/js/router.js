///////////////////////////////////////////////////////////////////////
// AV.Router: Extends Backbone.Router for the AKHMATOVIZ Project     //
//                                                                   //
// In this project's architecture, the router is the main object     //
// that is responsible for calling and coordinating all of the other //
// models, views, etc.                                               //
///////////////////////////////////////////////////////////////////////


AV.Router = Backbone.Router.extend({
    initialize: function() {
        this.sourceModel = new AV.SourceModel();
	this.sourceCollection = new AV.SourceCollection();
        this.sourceView = new AV.SourceView({
            model:this.sourceModel, collection:this.sourceCollection});
	    this.sourceCollectionView = new AV.SourceCollectionView(
            {collection:this.sourceCollection});
       	this.witnessCollection = new AV.WitnessCollection();
        this.comparisonSetModel = new AV.ComparisonSetModel();
        this.witnessCollectionView = new AV.WitnessCollectionView(
            {collection:this.witnessCollection, model:this.comparisonSetModel});
        this.comparisonSetCollection = new AV.ComparisonSetCollection();
        this.comparisonSetCollectionView = new AV.ComparisonSetCollectionView(
            {collection:this.comparisonSetCollection});
        this.visualizationModel = new AV.VisualizationModel();
        this.visualizationView = new AV.VisualizationView(
            {model: this.visualizationModel});
    },
    
    routes: {
        '': 'index',
        'sources': 'sources',
        'witnesses': 'witnesses',
        'sets': 'sets',
        'source': 'source',
        'source/:idToView' : 'source'
    },

    index: function() {
        this.source();
        this.sources();
	    this.witnesses();
	    this.sets();
    },
    
    sources: function () {
        this.sourceCollection.fetch();
    },

    sets: function() {
        this.comparisonSetCollection.fetch();
    },

    witnesses: function() {
        this.witnessCollection.fetch();
    },

    source: function(sourceID) {
        if (sourceID) {
            //render the source with that ID
            this.sourceModel.set('id', sourceID);
            this.sourceModel.url = this.sourceModel.urlRoot + '/' +
                this.sourceModel.id + '.json';
            this.sourceModel.fetch().done(
                _.bind(function(){this.sourceView.render();}, this));
        } else {
            this.sourceModel.clear().set(this.sourceModel.defaults);
            this.sourceView.render();
        }
    }
});

