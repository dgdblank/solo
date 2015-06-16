var fs = require('fs');

var database = {results: []};
module.exports = {
	addPayment: function (req, res, next){
		database.results.push(req.body);
		fs.writeFile('database.txt', JSON.stringify(database), function(err){
				if(err) console.log(err);
					console.log('database written');
				})
	},

	updateTable: function (req, res, next){

	}
}