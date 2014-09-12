AV.WorkspaceDropdownView = Backbone.View.extend({
    el: '#workspace-dropdown',
    template: _.template($("#workspace_dropdown_template").html()),
    initialize: function(){
        this.listenTo(this.collection, "all", this.render);
    },
    render: function() {
        this.$el.empty();
        this.$el.html(this.template({workspaces:this.collection.models}));
    }
});
