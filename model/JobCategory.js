const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobCategorySchema = new Schema({
    

    jobCategory : {
        type : String,
        required : true,
        unique : true
    },

});

const JobCategory  =  mongoose.model('jobCategory',jobCategorySchema)

module.exports = JobCategory