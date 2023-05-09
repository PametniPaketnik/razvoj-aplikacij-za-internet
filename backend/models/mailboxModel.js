var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var userSchema = new Schema({
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

var MailBox = mongoose.model('mailbox', userSchema);
module.exports = MailBox;
