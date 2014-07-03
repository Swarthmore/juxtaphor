/////////////////////////////////////////////////////////////
// init.js: Utility functions, Root Object definition      //
//                                                         //
// In this file, utility functions that are used elsewhere //
// in the code are all declared (test, json_post).         //
//                                                         //
// In addition, a root object, AV, is declared, for the    //
// purposes of nice, pleasant namespacing.                 //
/////////////////////////////////////////////////////////////


function test(arg){
	var output = arg || 'fire';
	console.log(output);
}

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
		error: function(e){test(flag); test(e);}
	});
}

var AV = {};
