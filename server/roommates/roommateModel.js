var mongoose = require('mongoose')

var RoomMateSchema = new mongoose.Schema({
 	name: String
});

module.exports = mongoose.model('RoomMate', RoomMateSchema);