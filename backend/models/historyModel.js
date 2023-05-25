var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var historySchema = new Schema({
    'parentMailBox' : String,
    'open' : String,
    'date' : Date,
});

var History = mongoose.model('history', historySchema);
module.exports = History;