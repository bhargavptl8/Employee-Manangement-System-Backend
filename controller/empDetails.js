const EmployeeDetails = require('../model/EmpDetails');


exports.EmployeeDetailsCreate = async (req, res) => {

    try {

        let { firstName, lastName, email, phoneNo, joiningDate, resignDate, Diff_CompanyExp, jobCategory, profession_Job, empImage } = req.body

        let employeeDetailsFind = await EmployeeDetails.findOne({ email });

        if (employeeDetailsFind) {
            throw new Error('Allready use Email! Change your Email-ID');
        }

        empImage = req.file?.filename

        let employeeDetailsCreate = await EmployeeDetails.create({ firstName, lastName, email, phoneNo, joiningDate, resignDate, Diff_CompanyExp, jobCategory, profession_Job, empImage })

        res.status(201).json({
            status: 'Success',
            message: 'EmployeeDetails Create SuccessFully',
            data: employeeDetailsCreate
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.EmployeeDetailsFind = async (req, res) => {

    try {

        let employeeDetailsFind = await EmployeeDetails.find();

        res.status(200).json({
            status: 'Success',
            message: 'EmployeeDetails Find SuccessFully',
            data: employeeDetailsFind
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.EmployeeDetailsDelete = async (req, res) => {

    try {

        let empDetailID = req.params.empDetailID

        let employeeDetailsDelete = await EmployeeDetails.findByIdAndDelete(empDetailID);

        if (!employeeDetailsDelete) {
            throw new Error('EmployeeDetails Not Found!');
        }

        let employeeDetailsFind = await EmployeeDetails.find();

        res.status(200).json({
            status: 'Success',
            message: 'EmployeeDetails Delete SuccessFully',
            data : employeeDetailsFind
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.EmployeeDetailsUpdate = async (req, res) => {

    try {

        let empDetailID = req.params.empDetailID

        let empDetailsFind = await EmployeeDetails.findById(empDetailID)

        if (!empDetailsFind) {
            throw new Error('EmployeeDetails Not Found!');
        }

        let { firstName, lastName, email, phoneNo, joiningDate, resignDate, Diff_CompanyExp, jobCategory, profession_Job } = req.body
        
        if(empDetailsFind.email !== email)
            {
                let emailFind = await EmployeeDetails.findOne({email});

                if(emailFind)
                    {
                        throw new Error('Allready use Email! Change your Email-ID');
                    }
            }

        if (!firstName) {
            req.body.firstName = empDetailsFind?.firstName
        }

        if (!lastName) {
            req.body.lastName = empDetailsFind?.lastName
        }

        if (!email) {
            req.body.email = empDetailsFind?.email
        }

        if (!phoneNo) {
            req.body.phoneNo = empDetailsFind?.phoneNo
        }

        if (!joiningDate) {
            req.body.joiningDate = empDetailsFind?.joiningDate
        }

        if (!resignDate) {
            req.body.resignDate = empDetailsFind?.resignDate
        }

        if (!Diff_CompanyExp) {
            req.body.Diff_CompanyExp = empDetailsFind?.Diff_CompanyExp
        }

        if (!jobCategory) {
            req.body.jobCategory = empDetailsFind?.jobCategory
        }

        if (!profession_Job) {
            req.body.profession_Job = empDetailsFind?.profession_Job
        }

        req.body.empImage = req.file?.filename;

        let employeeDetailsUpdate = await EmployeeDetails.findByIdAndUpdate(empDetailID, req.body, { new: true });

        if (!employeeDetailsUpdate) {
            throw new Error('EmployeeDetails Not Found!');
        }

        res.status(201).json({
            status: 'Success',
            message: 'EmployeeDetails Update SuccessFully',
            data: employeeDetailsUpdate
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.EmployeeDetailsSearching = async (req, res) => {

    try {

        let searchTerm = req.query.search

        const regex = new RegExp(searchTerm, 'i')

        let employeeDetailsFind = await EmployeeDetails.find({ $or : [
            {firstName : { $regex : regex} },
            {lastName : { $regex : regex} },
            {email : { $regex : regex} },
            {joiningDate : { $regex : regex} },
            {resignDate : { $regex : regex} },
            {Diff_CompanyExp : { $regex : regex} },
            {jobCategory : { $regex : regex} },
            {profession_Job : { $regex : regex} },
        ]});

        res.status(200).json({
            status: 'Success',
            message: 'EmployeeDetails Find SuccessFully',
            data: employeeDetailsFind
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}



