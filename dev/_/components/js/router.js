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
        this.listViewsRendered = false;
    },
    
    routes: {
        '': 'index',
        'source': 'source',
        'source/:idToView' : 'source',
        'visualization/:idToViz': 'visualize'

    },

    index: function() {
        this.renderListViews();
        this.source();
    },
    
    renderListViews: function(){
        this.sourceCollection.fetch();
        this.comparisonSetCollection.fetch();
        this.witnessCollection.fetch();
        this.listViewsRendered = true;
    },

    source: function(sourceID) {
        if (!(this.listViewsRendered)) {
            this.renderListViews();
        }
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
    },

    visualize: function (idToVisualize) {
        if (!(this.listViewsRendered)) {
            this.renderListViews();
            this.source();
        }
        console.log(idToVisualize);
        this.visualizationModel.set('id', idToVisualize);
        this.visualizationView.render();
	this.navigate('', {trigger: false, replace: true});
    }
    
});


