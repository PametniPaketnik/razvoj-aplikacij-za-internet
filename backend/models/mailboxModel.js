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
    'open' : Boolean

});
