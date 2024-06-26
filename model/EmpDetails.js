const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empDetailsSchema = new Schema({
    
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
    phoneNo : {
        type : Number,
        required : true
    },
    joiningDate : {
        type : String,
        required : true
    },
    resignDate : {
        type : String,
    },
    Diff_CompanyExp: {
        type : String,
    },
    jobCategory : {
        type : String,
        required : true
    },
    profession_Job : {
        type : String,
        required : true
    },
    empImage : [{
        type : String,
        required : true
    }]
});

const EmployeeDetails  =  mongoose.model('EmployeeDetail',empDetailsSchema)

module.exports = EmployeeDetails