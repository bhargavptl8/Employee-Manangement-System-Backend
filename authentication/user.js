const jwt = require('jsonwebtoken');
const SignUp = require('../model/SignUp');

exports.sequre = async (req, res, next) => {

    try {

        let token = req.headers.authorization

        if (!token) {
            throw new Error('Please Attach Token');
        }

        let decoded = jwt.verify(token, 'UserLogin');

        let userFind = await SignUp.findById(decoded.id);

        if (!userFind) {
            throw new Error('User Not Found');
        }

        next();

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })

    }

}