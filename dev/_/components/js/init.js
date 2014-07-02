// whatever javascript files you place in this iFEF `folder will be concatenated to a single file in the js library

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
