var paymentController = require('./paymentController.js');

// app is paymentRouter inject in server.js
module.exports = function (app) {
app.route('/')
	.post(paymentController.addPayment)
	.get(paymentController.updateTable);

};
