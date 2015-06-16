var fs = require('fs');
var PM = require('./paymentsModel.js');
var Q = require('q');

module.exports = {
	addPayment: function (req, res, next){
		var item = req.body.item;
		var payer = req.body.payer;
		var total = req.body.total;
		var cost = req.body.cost;

		var createPayment = Q.nbind(PM.create, PM);
		var newPay = {
			item: item,
			payer: payer,
			total: total,
			cost: cost
		}

		createPayment(newPay);
	},

	updateTable: function (req, res, next){
		var findAll = Q.nbind(PM.find, PM)

		findAll({})
			.then(function(payments){
				res.send(payments);
			})
			.fail(function(error){
				next(error);
			});
	}

	// userTotal: function (req, res, next){
	// 	// returns all the payments made by user
	// }
};
