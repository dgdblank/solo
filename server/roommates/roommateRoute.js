var roommateController = require('./roommateController.js');

// app is paymentRouter inject in server.js
module.exports = function (app) {
app.route('/')
	.post(roommateController.addRoommate)
	.get(roommateController.getRoommates);
};