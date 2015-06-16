var fs = require('fs');

var roommates = [];
module.exports = {
	addRoommate: function (req, res, next){
		roommates.push(req.body);
		fs.writeFile('roommates.txt', JSON.stringify(roommates), function(err){
			if(err) console.log(err);
			console.log('database written');
		})
	},

	getRoommates: function (req, res, next){
		fs.readFile('roommates.txt', 'utf8', function(err, data){
			if(err) console.log(err);
			res.send(data);
		});
	}
};