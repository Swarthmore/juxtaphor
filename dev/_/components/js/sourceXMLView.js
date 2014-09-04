AV.SourceXMLView = Backbone.View.extend ({
	el: '#tei-view-body',
	template: _.template($('#tei_view_template').html()),
	initialize: function(){
 		$('#teiModal').on('hidden.bs.modal',function(){
		router.navigate('', {trigger: false, replace: true});
		});
	},
	render: function(){
		console.log(this.model);
		this.$el.html(this.template({ sourceXML: this.model }));
	}
});
