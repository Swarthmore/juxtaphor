////////////////////////////////////////////////////////////////////
// SourceCollection takes all of the sources down from the        //
// Juxta server in order to display them in SourceCollectionView. //
//                                                                //
// It does not take SourceModel as its model, because SourceModel //
// has incompatible fields.                                       //
////////////////////////////////////////////////////////////////////

AV.SourceCollection = Backbone.Collection.extend({
    url: '/juxta/source.json'
});
