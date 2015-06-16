var fs = require('fs');

var splits = [];
module.exports = {
	splitCost: function (req, res, next){
		splits.push(req.body);
		// console.log(req.body);
		fs.writeFile('./costs/splits.txt', JSON.stringify(splits), function(err){
			if(err) console.log(err);
			console.log('database written');
		})
	},

	getSplit: function (req, res, next){
		fs.readFile('./costs/splits.txt', 'utf8', function(err, data){
			if(err) console.log(err);
			// console.log(data);
			res.send(data);
		});
	}
};
