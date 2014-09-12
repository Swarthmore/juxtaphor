AV.ComparisonSetCollection = Backbone.Collection.extend({
    url: AV.URL('set'),//'.json'),
    updateURL: function() {
        this.url = AV.URL('set');//'.json');
    }
});
