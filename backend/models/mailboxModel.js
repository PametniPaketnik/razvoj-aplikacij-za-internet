var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var mailBoxSchema = new Schema({
    'boxID' : String,
    'street' : String,
    'postcode' : Number,
    'post' : String,
    'country' : String,
    'lat' : Number,
    'lng' : Number,
    'open' : Boolean,
    'date' : Date,
    'userId' :
    {
        type: Schema.Types.ObjectId,
        ref : 'user'
    },
    'mailboxUser' :
    {
        type: Schema.Types.ObjectId,
        ref : 'user'
    },
    'accessUser' : [
        {
            type: Schema.Types.ObjectId,
            ref : 'user'
        }
    ]
});

var MailBox = mongoose.model('mailbox', mailBoxSchema);
module.exports = MailBox;
