var mongoose = require('mongoose')

var PaymentSchema = new mongoose.Schema({
 	item: String,
 	payer: String,
 	total: Number,
 	cost: [Number]
});

module.exports = mongoose.model('Payment', PaymentSchema);