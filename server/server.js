var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
// var fs = require('fs');

var app = express();
app.use(partials());
app.use(bodyParser.json());
app.use(express.static('../client'));

// use payment router for payment requests
var paymentRouter = express.Router();
app.use('/api/payment', paymentRouter);


// inject router into payment route
require('./payments/paymentRoute.js')(paymentRouter);



// var database = [];
// app.post('/payment', function(req, res){
// 	console.log('got to post');
// 	var data ='';
// 	req.on('data', function(chunk){
// 		data += chunk;
// 	})

// 	req.on('end', function(){
// 		database.push(data);
// 		res.sendStatus(201);
// 		fs.writeFile('database.txt', JSON.stringify(database), function(err){
// 			if(err) console.log(err);
// 			console.log('database written');
// 		})
// 	})
// });

// app.get('/', function(req, res){

// });


console.log('bill-splitting is listening on 3000');
app.listen(3000);
module.exports = app;
