const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const SignUp = require('../model/SignUp')


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "patelbhargav44397@gmail.com",
        pass: "wdgrgkopymtqxaau",
    },
});

async function main(mail, OTP, user) {

    const info = await transporter.sendMail({
        from: 'patelbhargav44397@gmail.com',
        to: mail, 
        subject: "OTP Verify",
        html: `<b>Dear ${user?.firstName.charAt(0).toUpperCase() + user?.firstName.substring(1) + ' ' + user?.lastName.charAt(0).toUpperCase() + user?.lastName.substring(1)}, <b>
        <p> We received a request to reset your password for your account with Employee Management.<br>
        To proceed with the password reset,please use the following One-Time Password(OTP):<br><br>
        <p style='font-size:17px'>OTP : ${OTP}</p><br>
        Please do not share this OTP with anyone for security reasons.<br><br>

         <pre style="font-size:17px;color : black">Best regards,
        Employee Management</pre>
        `
    });

    console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);


exports.UserSignUp = async (req, res) => {

    try {

        let { firstName, lastName, email, password, userImage } = req.body

        let userFind = await SignUp.findOne({ email });

        if (userFind) {
            throw new Error('Allready SignUp! Change your Email-ID');
        }

        userImage = req.file?.filename

        password = await bcrypt.hash(password, 10);

        let userCreate = await SignUp.create({ firstName, lastName, email, password, userImage })

        res.status(201).json({
            status: 'Success',
            message: 'User SignUp SuccessFully',
            data: userCreate
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}


exports.UserLogin = async (req, res) => {

    try {

        let { email, password } = req.body

        let userFind = await SignUp.findOne({ email });

        if (!userFind) {
            throw new Error('Email-ID Not Found');
        }

        passwordCompare = await bcrypt.compare(password, userFind.password)

        if (!passwordCompare) {
            throw new Error('Invalid Password');
        }

        let token = jwt.sign({ id: userFind._id }, 'UserLogin');

        res.status(200).json({
            status: 'Success',
            message: 'User Login SuccessFully',
            data: userFind,
            token
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}


exports.UserForgetPassword = async (req, res) => {

    try {

        let { email, confirmPassword, re_enter_confirmPassword } = req.body

        let emailFind = await SignUp.findOne({email})

        if(!emailFind)
            {
                throw new Error('Email-ID Not Found');
            }

        if (confirmPassword !== re_enter_confirmPassword) {
            throw new Error("NewPassword and Confirm Password can't same");
        }

        confirmPassword = await bcrypt.hash(confirmPassword, 10);

        let userPasswordChange = await SignUp.findOneAndUpdate({ email }, { $set: { password: confirmPassword } }, { new: true })

        res.status(201).json({
            status: 'Success',
            message: 'Password Change SuccessFully',
            data: userPasswordChange,
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.UserEmailVerify = async (req, res) => {

    try {

        let { email } = req.body

        let emailFind = await SignUp.findOne({ email });

        if (!emailFind) {
            throw new Error('Email-ID Not Found');
        }

        let OTP = ''

        for (let i = 0; i < 6; i++) {
            OTP += Math.floor(Math.random() * 10)
        }

        main(email, OTP, emailFind)

        let addOTP = await SignUp.findOneAndUpdate({email} , {$set : {otp : OTP}}, {new : true})

        res.status(201).json({
            status: 'Success',
            message: 'Email Verify SuccessFully',
            data: addOTP,
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}


exports.UserOTPVerify = async (req, res) => {

    try {

        let { email, OTP } = req.body

        let userFind = await SignUp.findOne({ email });

        if(!userFind)
            {
                throw new Error('Email-ID Not Found');
            }

        if(userFind.otp !== OTP)
            {
                throw new Error('Invalid OTP');
            }

        res.status(201).json({
            status: 'Success',
            message: 'OTP Verify SuccessFully',
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

