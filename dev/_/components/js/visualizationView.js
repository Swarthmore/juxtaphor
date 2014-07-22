AV.VisualizationView = Backbone.View.extend({
    el: '#visualization',
    initialize: function() {
	    //var template = _.template( $("#modal_template").html());
	    //this.$el.html( template );
        $("#visualization").load(_.bind(function(){
            console.log("it did a reload");
            console.log($("#visualization").contents()[0].title);
            if (!($("#visualization").contents()[0].title)) {
                console.log("RENDERING it says");
                document.getElementById('visualization')
                    .contentWindow
                    .location
                    .reload(true);
            }
        }, this));

        $('#visualizationModal').on('hidden.bs.modal',function(){
            router.navigate('', {trigger: false, replace: true});
        });
    },
    sideBySide: function() {
        this.model.url = this.model.urlRoot + '/' + this.model.id;
        this.model.fetch(
            {success: _.bind(function(){
                var ids = _.pluck(this.model.get('witnesses'), 'id');

                if (ids.length < 2){
                    console.log('ids.length < 2: ' + ids);
                }
                this.model.url = this.model.urlRoot + '/' + this.model.id +
                    '/view?mode=sidebyside&condensed=true&docs=' +
                    ids[0] + ',' + ids[1];

	            /*
		         * Set the Share button route located in the modal template
		         */


		        var basePath = "pages/present.html";
	            var path = basePath +'#' +
		                Backbone.history.fragment;
	            $("#shareID").attr("href", path);

                this.render();
            }, this)
            });

    },

    heatMap: function() {
        this.model.url = this.model.urlRoot + '/' + this.model.id +
            '/view?mode=heatmap&condensed=true';

	    //Set the Share button route.
	    var basePath = "pages/present.html";
	    var path = basePath  +'#' + Backbone.history.fragment;
	    $("#shareID").attr("href", path);

	    this.render();
    },

    // The rendering of the visualization will be slightly
    // different here, because there is no templating necessary:
    // The server gives back a page.

    render: function(url){

        var response = $.ajax({
            url: this.model.url,
            type: "GET"
        }).done(_.bind(function(d) {
            //If the server returns an HTML document
            if (d[0] != 'R') {
                return d;
            } else { //Rendering
                setTimeout(function(){}, 1000);
                return this.render();
            }
        }, this));
        $("#visualization").attr('src', this.model.url).load(_.bind(function() {
            var iframe = $("#visualization").contents();
            iframe.find('.menubar').remove();
	        iframe.find('#change-workspace').remove();
        }, this));

        $('#visualizationModal').modal({
            show: true
        });
    }
});
