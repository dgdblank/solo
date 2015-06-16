var fs = require('fs');

var items = [];
module.exports = {
	addPayment: function (req, res, next){
		items.push(req.body);
		// console.log(req.body);
		fs.writeFile('./payments/items.txt', JSON.stringify(items), function(err){
			if(err) console.log(err);
			console.log('database written');
		})
	},

	updateTable: function (req, res, next){
		fs.readFile('./payments/items.txt', 'utf8', function(err, data){
			if(err) console.log(err);
			// console.log(data);
			res.send(data);
		});
	}
};
