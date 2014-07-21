/////////////////////////////////////////////////////////////////////
// WitnessCollection takes all witnesses down from the             //
// Juxta server in order to display them in WitnessCollectionView. //
/////////////////////////////////////////////////////////////////////

AV.WitnessCollection = Backbone.Collection.extend({
    url: AV.URL('witness.json'),
    updateURL: function() {
        this.url = AV.URL('witness.json');
    }
});
