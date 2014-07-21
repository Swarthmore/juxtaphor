AV.WorkspaceEditView = Backbone.View.extend({
    el: '#workspaceModal',
    template: _.template($('#workspace_edit_template').html()),
    events: {
        'click #deleteWorkspaceButton': 'delete',
        'click #newWorkspaceButton': 'newWorkspace'
    },
    initialize: function(){
        this.listenTo(this.collection, "all", this.render);
        $('workspaceModal').on('hidden.bs.modal', function(){
            router.navigate('', {trigger: false, replace: true});
        });
    },
    render: function(){
        $('#workspace-modal-body').html(this.template(
            {workspaces: this.collection.models}));
        $('#workspaceModal').modal({
            show: true
        });
    },
    delete: function(ev) {
        var idToDelete = $(ev.currentTarget).data('value');
	    var sourceToRemove = this.collection.find(function (source) {
		    return source.id == idToDelete;});
	    sourceToRemove.url = '/juxta/workspace/' +
            encodeURIComponent(sourceToRemove.get('name'));
	    sourceToRemove.destroy();
    },
    newWorkspace: function() {
        json_post('/juxta/workspace', 
                  {name: $('#workspaceName').val()},
                  this.collection.fetch());
    }
});
