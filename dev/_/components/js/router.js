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
        'source/:idToView' : 'source',
	    'transform/:idToTransform': 'transform',
        'visualization/:idToVisualize': 'visualize'
    },

    index: function() {
        this.sources();
    },
    
    sources: function () {
        this.sourceCollection.fetch({reset: true});
    },

    sets: function() {
        this.comparisonSetCollection.fetch({reset: true});
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
    },

    //this route displays the contents of the source
    view: function(idToView) {
        
        //Bind passes state (``this'') into the anonymous function below
        this.sourceModel.fetch({success: _.bind(function()
                                                {this.viewSourceView.render();},
                                                this)});
    },
    upload: function () {
        this.uploadSourceView.render();
    },

    // Transform a source into a witness on the server-side
    // Nothing is actually changed on the client side
    transform: function (idToTransform) {
	    console.log("about to transform!");
	    var url = "/juxta/transform";
	    var request = { source: idToTransform };
	    //We use AJAX to send the request directly from here.
	    $.ajax({
		    type: 'POST',
		    url: url,
		    data: JSON.stringify(request),
		    contentType: 'application/json',
		    success: function(){ test('transform success'); },
		    error: function(e) { test(e); }
   		});
	    this.navigate('index');
	},
    visualize: function (idToVisualize) {
        console.log(idToVisualize);
        this.visualizationModel.set('id', idToVisualize);
        this.visualizationView.render();
    }
});

