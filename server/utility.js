exports.collectData = function(req, callback){
	var data ='';
	req.on('data', function(chunk){
		data += chunk;
	})

	req.on('end', function(){
		database.push(data);
		res.send(201);
	})
}