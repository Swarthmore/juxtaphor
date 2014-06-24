//Running the models
var source1 = new AV.Source({
	name: 'Rip Ripley',
	type: 'raw',
	contentType: 'txt',
	data: "YOYOYOYO. Rip Ripley in the House."
});
var source_view = new AV.SourceView({el: $("#search_container"), model: source1 });
source_view.render();

console.log("INSIDE OF THE MAIN!");
