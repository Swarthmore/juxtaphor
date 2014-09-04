AV.SourceXMLView = Backbone.View.extend ({
	el: '#tei-view-body',
	template: _.template($('#tei_view_template').html()),
	initialize: function(){
 		$('#teiModal').on('hidden.bs.modal',function(){
		router.navigate('', {trigger: false, replace: true});
		});
	},
	render: function(){
		var teiJSON = AV.parseXML(this.model.get('content'));
		console.log(teiJSON);
		this.$el.html(this.template({ sourceXML: this.model }));
	},

	parseXML: function(xml) {
	
		var teiJSON = {},
		teiJSON.base = [],
		teiJSON.apps = [],
		appCount = 0,
		body = $('body', xml).children(),
		firstWit = $($('witness',xml)[0]);

		var baseID = firstWit.attr('xml:id'),
		teiJSON.title = firstWit.context.textContent;

		body.each(function(i){
			appCount++;
			var tag = $(this).context.nodeName;
			if (tag == 'app'){
				var $app = this.children();
				$app.each(function(){
					var wit = $(this).attr('wit');
					if (wit == baseID) teiJSON.base[appCount] = { 'wit': wit, 'rdg': $(this).context.textContent };
					else teiJSON.base[appCount] = { 'wit': wit, 'rdg': $(this).context.textContent };
				});
			}
		});

		return teiJSON;
	}
});
