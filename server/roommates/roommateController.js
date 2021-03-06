var RM = require('./roommateModel.js');
var Q = require('q');

module.exports = {
	addRoommate: function (req, res, next){
		var roommate = req.body.name;
		var findRoomMate = Q.nbind(RM.findOne, RM);
		var createRoomMate = Q.nbind(RM.create, RM);
		findRoomMate({name: roommate})
			.then(function(roomie){
				if(roomie){
					// throw error that person already exists
				} else {
					var newRM = {
						name: roommate
					}
					createRoomMate(newRM)
				}
			})
	},

	getRoommates: function (req, res, next){
		var findAll = Q.nbind(RM.find, RM);

		findAll({})
			.then(function(roomies){
				res.send(roomies);
			})
			.fail(function(error){
				next(error);
			});
	}
};