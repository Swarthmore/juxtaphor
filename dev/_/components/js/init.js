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
	console.log('json_post fired ' + url); 
}
//From http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
    var expires;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		 expires = "; expires="+date.toGMTString();
	}
	else expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

// The development code-name for this project was Akhmatoviz,
// So the root object is called AV.
// (If Apple can put NextStep in front of everything, we can do it too ;) )
var AV = {};

// The way that workspaces are implemented in the Juxta API mandates sending
// he name of the workspace with every request. This allows for workspace
// selection to be stateful on the client side, and also makes for cleaner
// code when writing URLs.

function getWorkspaceFromCookie (){
    var workspace = readCookie('workspace');
    if (!workspace) {
        createCookie('workspace', 'public', 95);
        return 'public';
    } else {
        return workspace;
    }
}

AV.WORKSPACE = getWorkspaceFromCookie();

AV.URL = function(path) {
    path = path ? path : '';
    return '/juxta/' + AV.WORKSPACE + '/' + path;
};
