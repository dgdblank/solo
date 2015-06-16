var fs = require('fs');

var roommates = [];
module.exports = {
	addRoommate: function (req, res, next){
		roommates.push(req.body);
		fs.writeFile('./roommates/roommates.txt', JSON.stringify(roommates), function(err){
			if(err) console.log(err);
			console.log('roommate written');
		})
	},

	getRoommates: function (req, res, next){
		fs.readFile('./roommates/roommates.txt', 'utf8', function(err, data){
			if(err) console.log(err);
			res.send(data);
		});
	}
};