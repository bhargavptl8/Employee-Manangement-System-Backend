const JobCategory = require('../model/JobCategory');


exports.JobCategoryCreate = async (req, res) => {

    try {

        let { jobCategory } = req.body

        let jobCategoryFind = await JobCategory.findOne({ jobCategory });

        if (jobCategoryFind) {
            throw new Error('Allready has jobCategory!')
        }

        let jobCategoryCreate = await JobCategory.create({ jobCategory })

        res.status(201).json({
            status: 'Success',
            message: 'JobCategory Create SuccessFully',
            data: jobCategoryCreate
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.JobCategoryFind = async (req, res) => {

    try {

        let jobCategoryFind = await JobCategory.find();

        res.status(200).json({
            status: 'Success',
            message: 'JobCategory Find SuccessFully',
            data: jobCategoryFind
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.JobCategoryDelete = async (req, res) => {

    try {

        let jobCategoryID = req.params.jobCategoryID

        let jobCategoryDelete = await JobCategory.findByIdAndDelete(jobCategoryID);

        if (!jobCategoryDelete) {
            throw new Error('JobCategory Not Found!');
        }

        res.status(200).json({
            status: 'Success',
            message: 'JobCategory Delete SuccessFully',
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.JobCategoryUpdate = async (req, res) => {

    try {

        let jobCategoryID = req.params.jobCategoryID

        let { jobCategory } = req.body;

        let find = await JobCategory.findById(jobCategoryID);

        if (!find) {
            throw new Error('JobCategory Not Found!');
        }

        if (find.jobCategory !== jobCategory) {
            let jobCategoryFind = await JobCategory.findOne({ jobCategory });

            if (jobCategoryFind) {
                throw new Error('Allready has JobCategory!');
            }
        }


        let jobCategoryUpdate = await JobCategory.findByIdAndUpdate(jobCategoryID, req.body, { new: true });

        if (!jobCategoryUpdate) {
            throw new Error('JobCategory Not Found!');
        }

        res.status(201).json({
            status: 'Success',
            message: 'JobCategory Update SuccessFully',
            data: jobCategoryUpdate
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}