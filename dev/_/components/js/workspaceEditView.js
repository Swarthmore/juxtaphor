AV.WorkspaceEditView = Backbone.View.extend({
    el: '#workspaceModal',
    template: _.template($('#workspace_edit_template').html()),
    error: '<div class="alert alert-danger" role="alert">' +
           'Workspace names must be alphanumeric, and not greater than 20 ' +
           'characters long.' + '</div>',
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
        $('#workspace-modal-body').empty().html(this.template(
            {workspaces: this.collection.models}));
    },
    showModal: function() {
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
        this.render();
    },
    newWorkspace: function() {
        var workspaceName = $('#workspaceName').val();
        if (workspaceName.length > 20 || workspaceName.length < 1 ||
            // /[^a-z0-9]/i is a regular expression that
            // matches any character that is not alphanumeric
            workspaceName.match(/[^a-z0-9]/i)) {
            console.log("Bad workspace name");
            console.log(workspaceName);
            $('#workspaceName').before(this.error);
        } else {
            json_post('/juxta/workspace',
                      {name: workspaceName},
                      _.bind(function(){
                          this.collection.fetch();
                          this.render();
                      }, this));
        }
    }
});
