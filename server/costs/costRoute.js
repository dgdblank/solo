var costController = require('./costController.js');

// app is paymentRouter inject in server.js
module.exports = function (app) {
app.route('/')
	.post(costController.splitCost)
	.get(costController.getSplit);
};
