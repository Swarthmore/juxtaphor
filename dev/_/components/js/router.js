// AV.Router: Extends Backbone.Router for the AKHMATOVIZ Project
// -------------------------------------------------------------
// Most of our calls to all of the models and things should come from here.


AV.Router = Backbone.Router.extend({
    initialize: function() {
        this.sourceModel = new AV.SourceModel();
        this.uploadSourceView = new AV.UploadSourceView({model: this.sourceModel});
        this.destroySourceView = new AV.DestroySourceView({model: this.sourceModel});
        this.editSourceView = new AV.EditSourceView({model:this.sourceModel});
        this.sourceCollection = new AV.SourceCollection();
        this.sourceCollectionView = new AV.SourceCollectionView({collection:
                                                                 this.sourceCollection});
        console.log("Initializing router");
    },
    
    routes: {
        '': 'index',
        'sources': 'sources',
        'source/upload/': 'upload',
        'source/destroy/': 'destroy',
        'source/edit/:idToEdit': 'edit',
        'source/delete/:idToDelete': 'delete'
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
    delete: function(idToDelete) {
        var foo = this.sourceCollection.find(function (source) {
            return source.id == idToDelete;});
        console.log(foo);
        foo.urlRoot = "php/redirect.php/source/";
        foo.destroy();
	    this.navigate('',{trigger: false});	
        this.sourceCollectionView.render();
    },
    edit: function(idToEdit) {
//        this.sourceCollection.fetch();
        var source = this.sourceCollection.find(function (source) {
            return source.id == idToEdit;});
        console.log(source ? source : "Panic and freak out.");
        source.urlRoot = "php/redirect.php/source";
        this.editSourceView.model = source;
        this.editSourceView.render();

    }
});




