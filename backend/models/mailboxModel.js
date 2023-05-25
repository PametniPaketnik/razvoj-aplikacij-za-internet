var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var mailBoxSchema = new Schema({
    'boxID' : String,
    'street' : String,
    'postcode' : Number,
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
