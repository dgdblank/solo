var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
// var fs = require('fs');

// initialize server and serve client files
var app = express();
app.use(partials());
app.use(bodyParser.json());
app.use(express.static('../client'));

// create multiple routers
var paymentRouter = express.Router();
var roommateRouter = express.Router();
var costRouter = express.Router();

app.use('/api/payment', paymentRouter);
app.use('/api/roommate', roommateRouter);
app.use('/api/cost', costRouter); 

// inject routers into routes
require('./payments/paymentRoute.js')(paymentRouter);
require('./roommates/roommateRoute.js')(roommateRouter);
require('./costs/costRoute.js')(costRouter);


console.log('bill-splitting is listening on 3000');
app.listen(3000);
module.exports = app;
