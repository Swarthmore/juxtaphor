/////////////////////////////////////////////////////////////////////
// WitnessCollection takes all witnesses down from the             //
// Juxta server in order to display them in WitnessCollectionView. //
/////////////////////////////////////////////////////////////////////

AV.WitnessCollection = Backbone.Collection.extend({
    url: '/juxta/witness.json'
});
