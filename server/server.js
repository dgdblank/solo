var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');

var app = express();
app.use(partials());
app.use(bodyParser.json());
app.use(express.static('../client'));


console.log('bill-splitting is listening on 3000');
app.listen(3000);
