AV.VisualizationView = Backbone.View.extend({
    el: '#visualization',
    // The rendering of the visualization will be slightly
    // different here, because there is no templating necessary:
    // The server gives back a page.
    render: function() {
        this.model.url = this.model.urlRoot + this.model.id +
            '/view?mode=heatmap&condensed=true';
        var response = $.ajax({
            url: this.model.url,
            type: "GET"
        }).done(_.bind(function(d) {
            console.log(d);
            if (d[0] != 'R') {
                return d;
            } else {
                console.log(this.el);
                var taskID = d.split(' ').pop();
                return this.handleWait(taskID);
            }
        }, this));
        // console.log(response);
        // this.$el.attr('src', this.model.url).load(_.bind(function() {
        //     var iframe = this.$el.contents();
        //     iframe.find('.menubar').remove();
		// 	iframe.find('.title-bar').remove();
        // }, this));
        // this.$el.toggle();
    },

    // extractTaskID is necessary because Juxta can not be trusted to
    // provide its task ID with any sort of uniformity.
    extractTaskID: function(response) {
        
    },

    // HandleWait :: str (task ID) -> Rendered Visualization
    handleWait : function(taskID) {
        console.log(taskID);
        $.ajax({
            url: 'http://54.88.3.200:8182/juxta/task/' + taskID + '.json',
            type: 'get'
        }).done(function(d) {
            console.log(d);
            console.log(d.status);
            var status = d.status;
            switch(status){
            case 'PENDING':
            case 'PROCESSING':
                //DEPLOY THE SPINNER
                break;
            case 'CANCEL_REQUESTED':
            case 'CANCELED':
                //DO SOMETHING ABOUT CANCELLING
                break;
            case 'FAILED':
                //Throw an error
                break;
            case 'COMPLETE':
                //go get that file!
                break;
            }
        });
    }
});


