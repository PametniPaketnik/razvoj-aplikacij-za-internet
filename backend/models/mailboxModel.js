var mongoose = require('mongoose');
const mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var mailBoxSchema = new Schema({
    'id' : Int,
    'name' : String,
    'street' : String,
    'postcode' : Int,
    'post' : String,
    'open' : Boolean,
    'date' : Date,
    'userId' :
    {
        type: Schema.Types.ObjectId,
        ref : 'user'
    }

});

var MailBox = mongoose.model('mailbox', mailBoxSchema);
module.exports = MailBox;
