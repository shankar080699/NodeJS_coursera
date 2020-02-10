const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const User = new Schema({
   // using session
    /* username : {
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },*/
    firstname : {
        type : String,
        default : ''
    },
    lastname : {
        type : String,
        default : ''
    },
    fackbookId: String,
    admin :{
        type : Boolean,
        default : false
    }

})

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);