var express = require('express');
var router = express.Router();
const jobCategoryController = require('../controller/jobCategory');
const userAuthentication = require('../authentication/user');


router.post('/create', userAuthentication.sequre, jobCategoryController.JobCategoryCreate);
router.get('/find', userAuthentication.sequre, jobCategoryController.JobCategoryFind);
router.delete('/delete/:jobCategoryID', userAuthentication.sequre, jobCategoryController.JobCategoryDelete);
router.patch('/update/:jobCategoryID', userAuthentication.sequre, jobCategoryController.JobCategoryUpdate);

module.exports = router;
