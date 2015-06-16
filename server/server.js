var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
// var fs = require('fs');

// initialize server and serve client files
var app = express();
app.use(partials());
app.use(bodyParser.json());
app.use(express.static('../client'));

// use payment router for payment requests
var paymentRouter = express.Router();
app.use('/api/payment', paymentRouter);

// inject router into payment route
require('./payments/paymentRoute.js')(paymentRouter);


console.log('bill-splitting is listening on 3000');
app.listen(3000);
module.exports = app;
