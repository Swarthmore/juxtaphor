AV.ComparisonSetModel = Backbone.Model.extend({
    urlRoot: AV.URL('set'),
	defaults: {
		id: null,
		filterWhitespace: true,
		filterPunctuation: false,
		filterCase: true,
		hyphenationFilter: "INCLUDE_ALL"
	},
    updateURL: function() {
        this.urlRoot = AV.URL('set');
    },
	collateSetOpts: function() {
		var data = this.attributes;
		var url = this.url + '/' + this.attributes.id + '/collator';
		json_post(url,data,this.collate(), 'setopts');
	},
	collate: function() {
        console.log("this.attributes.id is "+this.attributes.id);
		var url = this.urlRoot + '/' + this.attributes.id + '/collate';
        console.log(url);
        $.ajax({
            url: url,
            type: 'POST'
        }).done(function(){
            Backbone.trigger("comparison:collate");
        });
	},
	viewHeatMap: function(){
		this.url = this.url + '/' + this.attributes.id + '/view';
		var params = {mode: 'heatmap', embed: true};

		var heatmap = $.ajax({
			type: 'GET',
			data: params,
			processData: true,
			dataType: 'html'
		});
		return heatmap;
	}
});

