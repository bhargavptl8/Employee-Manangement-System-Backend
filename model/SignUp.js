const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signUpSchema = new Schema({
    
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    userImage : [{
        type : String,
        required : true
    }],
    otp : {
        type : String
    }

});

const SignUp  =  mongoose.model('signup',signUpSchema)

module.exports = SignUp