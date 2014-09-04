AV.sourceXMLView = Backbone.View.extend ({
	el: '#tei-view-body',
	template: _.template($('#tei_view_template').html()),
	initialize: function(){

	},
	render: function(){
		this.$el.html(this.template({ sourceXML: this.model }));
	}
});