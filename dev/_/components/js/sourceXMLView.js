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
		var isPS = this.PScheck(teiXML);
		console.log(isPS);
		var teiJSON = this.PStoJSON(teiXML);
		this.$el.html(this.template({ tei: teiJSON }));
	
		if(isPS === true) {	
		$('#tei-base span').on('click', function(ev){
			var crntApp = $(ev.currentTarget);
			crntAppID = crntApp.attr('id');
	
			console.log(crntApp);
			console.log(crntAppID);

			$('div.modal-body.row').css({ 'background-color': '#fff' });
			$('#tei-base p span').css({'background-color': '#fff'});
			$('#tei-rdgs ul').css({'display': 'none'});	
			
			crntApp.css({'background-color': '#8792ff', 'text-decoration': 'none'});
			$('#tei-rdgs ul#' + crntAppID).css({'display': 'block'});
		});}
	},
	
	PScheck: function(xml){
		var teiHeader = $('teiHeader',xml).children();
		console.log('teiHeader',teiHeader);
		console.log(teiHeader.length);
		if(teiHeader.length > 1) {
			if (teiHeader.find('variantEncoding').attr('method') == 'parallel-segmentation') return true;
			else return false;	
		} else { return false; }
	},

	PStoJSON: function(xml) {
	
		var appCount = 0,
		body = $('body', xml).children(),
		firstWit = $($('witness',xml)[0]),
		baseID = firstWit.attr('xml:id').slice(4);
		
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
					var wit = $(this).attr('wit').slice(5);
					console.log('wit :' + wit);
					if (wit == baseID) teiJSON.base.push({ 'wit': wit, 'text': $(this).context.textContent });
					else teiJSON.apps[appCount].push({ 'wit': wit, 'text': $(this).context.textContent });
				});
			}
		});
		console.log('teiJson');
		console.log(teiJSON);
		return teiJSON;
	}
});
