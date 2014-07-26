/////////////////////////////////////////////////////////////
// init.js: Utility functions, Root Object definition      //
//                                                         //
// In this file, utility functions that are used elsewhere //
// in the code are all declared (test, json_post).         //
//                                                         //
// In addition, a root object, AV, is declared, for the    //
// purposes of nice, pleasant namespacing.                 //
/////////////////////////////////////////////////////////////

function json_post(url,data,callback,flag){
	data = data || '';
	callback = callback || '';
	flag = flag || 'default';
	$.ajax({
		url: url,
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		success: callback,
		error: function(e){
            console.log(flag);
            console.log(e);
        }
	});
}
// The development code-name for this project was Akhmatoviz,
// So the root object is called AV.
// (If Apple can put NextStep in front of everything, we can do it too ;) )
var AV = {};

// The way that workspaces are implemented in the Juxta API mandates sending
// he name of the workspace with every request. This allows for workspace
// selection to be stateful on the client side, and also makes for cleaner
// code when writing URLs.
AV.WORKSPACE = 'public'; //TODO: Make this stateful between sessions. Cookies?
AV.URL = function(path) {
    path = path ? path : '';
    return '/juxta/' + AV.WORKSPACE + '/' + path;
};
