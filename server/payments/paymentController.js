var fs = require('fs');

var database = [];
module.exports = {
	addPayment: function (req, res, next){
		database.push(req.body);
		// console.log(req.body);
		fs.writeFile('database.txt', JSON.stringify(database), function(err){
			if(err) console.log(err);
			console.log('database written');
		})
	},

	updateTable: function (req, res, next){
		fs.readFile('database.txt', 'utf8', function(err, data){
			if(err) console.log(err);
			// console.log(data);
			res.send(data);
		});
	}
};