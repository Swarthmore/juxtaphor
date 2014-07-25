///////////////////////////////////////////////////////////////////////
// AV.Router: Extends Backbone.Router for the AKHMATOVIZ Project     //
//                                                                   //
// In this project's architecture, the router is the main object     //
// that is responsible for calling and coordinating all of the other //
// models, views, etc.                                               //
///////////////////////////////////////////////////////////////////////


AV.Router = Backbone.Router.extend({
    initialize: function() {
        this.workspaceCollection = new AV.WorkspaceCollection();
        this.workspaceDropdownView = new AV.WorkspaceDropdownView(
            {collection:this.workspaceCollection});
        this.workspaceEditView = new AV.WorkspaceEditView(
            {collection:this.workspaceCollection});
        this.sourceModel = new AV.SourceModel();
	    this.sourceCollection = new AV.SourceCollection();
        this.sourceView = new AV.SourceView(
            {model:this.sourceModel, collection:this.sourceCollection});
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
        'viz/heatmap/:idToViz': 'heatMap',
        'viz/sidebyside/:idToViz': 'sideBySide',
        'workspace': 'editWorkspaces',
        'workspace/:ws' : 'switchWorkspace'
    },

    index: function() {
        this.renderListViews();
        this.source();
    },

    renderListViews: function(){
        this.workspaceCollection.fetch({reset: true});
        this.sourceCollection.fetch({reset: true});
        this.comparisonSetCollection.fetch({reset: true});
        this.witnessCollection.fetch({reset: true});
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

    sideBySide: function (idToVisualize) {
        if (!(this.listViewsRendered)) {
            this.renderListViews();
            this.source();
        }
        console.log(idToVisualize);
        this.visualizationModel.set('id', idToVisualize);
        this.visualizationView.sideBySide();
	    //Show the "Collections" tab
	    $('#tablist a[href="#collectionsTab"]').tab('show');
    },

    heatMap: function (idToVisualize) {
        console.log("Heatmap route OK");
        if (!(this.listViewsRendered)) {
            this.renderListViews();
            this.source();
        }
        console.log(idToVisualize);
        this.visualizationModel.set('id', idToVisualize);
        this.visualizationView.heatMap();
	    //Show the "Collections" tab
	    $('#tablist a[href="#collectionsTab"]').tab('show');
    },

    editWorkspaces: function(){
        this.workspaceCollection.fetch(
            {success: _.bind(
                function() {
                    this.workspaceEditView.render();
                    this.workspaceEditView.showModal();
                }, this)
            });
    },

    switchWorkspace: function(workspace){
        AV.WORKSPACE = workspace;
        console.log(AV.WORKSPACE);
        this.sourceModel.updateURL();
        this.sourceCollection.updateURL();
        this.witnessCollection.updateURL();
        this.comparisonSetCollection.updateURL();
        this.comparisonSetModel.updateURL();
        this.visualizationModel.updateURL();
        this.sourceCollection.fetch({reset:true});
        this.witnessCollection.fetch({reset:true});
        this.comparisonSetCollection.fetch({reset:true});
        this.navigate('');
        this.index();
    }
});
