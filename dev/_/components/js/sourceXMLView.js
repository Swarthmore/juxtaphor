AV.SourceXMLView = Backbone.View.extend ({
	el: '#tei-view-body',
	template: _.template($('#tei_view_template').html()),
	initialize: function(){
 		$('#teiModal').on('hidden.bs.modal',function(){
		router.navigate('', {trigger: false, replace: true});
		});
	},
	render: function(){
		var teiXML = $.parseXML(this.model.get('content'));
		var teiJSON = this.PStoJSON(teiXML);
		this.$el.html(this.template({ tei: teiJSON }));
		
		$('#tei-base span').on('click', function(ev){
			var crntApp = $(ev.currentTarget).attr('id');
			console.log(crntApp);
			$('#tei-rdgs ul').css('display','none');	
			$('#tei-rdgs ul#' + crntApp).css('display','block');
		});
	},

	PStoJSON: function(xml) {
	
		var appCount = 0,
		body = $('body', xml).children(),
		firstWit = $($('witness',xml)[0]),
		baseID = firstWit.attr('xml:id').slice(-4);
		
		var teiJSON = {};
		teiJSON.apps = [];
		teiJSON.baseID = baseID;
		teiJSON.base = [];
		teiJSON.title = firstWit.context.textContent;
		
		body.each(function(i){
			var tag = $(this).context.nodeName;
			if(tag == 'lb') teiJSON.base.push('<br/>');
			if (tag == 'app'){
				appCount++;
				teiJSON.apps[appCount] = [];
				var $app = $(this).children();
				$app.each(function(i){
					var wit = $(this).attr('wit').slice(-4);
					if (wit == baseID) teiJSON.base.push({ 'wit': wit, 'text': $(this).context.textContent });
					else teiJSON.apps[appCount].push({ 'wit': wit, 'text': $(this).context.textContent });
				});
			}
		});
		return teiJSON;
	}
});
