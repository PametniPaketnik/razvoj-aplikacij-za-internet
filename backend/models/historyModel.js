var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var historySchema = new Schema({
    'parentMailBox' : String,
    'isSuccessfulOpen' : Boolean,
    'date' : Date,
});

var History = mongoose.model('history', historySchema);
module.exports = History;