////////////////////////////////////////////////////////////
// SourceModel mirrors Juxta's ``Source'' object for      //
// the purposes of interacting with one source at a time. //
//                                                        //
// SourceModel is not for interacting with many sources   //
// as we do in SourceCollection and SourceCollectionView. //
////////////////////////////////////////////////////////////

AV.SourceModel = Backbone.Model.extend({
	urlRoot: AV.URL('source'),
	defaults: {
		name: null,
		type: 'raw',
		contentType: 'txt',
		data: null
	},
    // The Juxta server gets rather annoyed if it isn't spoken
    // to in just the right way.
    // To interact with sources, the json you send must be in
    // an array.
	sync: function(a,b,c){
		b.attributes = [b.attributes];
		return Backbone.sync.apply(this, [a,b,c]);
    },
    updateURL: function() {
        this.urlRoot = AV.URL('source');
        console.log("Current urlroot:" + this.urlRoot);
    }
});

