var express = require('express');
var router = express.Router();
const multer  = require('multer')
const userController = require('../controller/user');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage })

const isImageValidation = (req, res, next) => {

  try {

    if(req.file)
      {
        let imageFileExtension = ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp', 'apng', 'avif', 'gif'];
    
        let fileExtension = req.file?.originalname.split('.').reverse()[0];
    
        if(!imageFileExtension.includes(fileExtension))
          {
             throw new Error(`${fileExtension} is not Image`);
          }
      }

    next();
    
  } catch (error) {

    res.status(404).json({
        status : 'Fail',
        message : error.message
    })
  }
}

router.post('/signup', upload.single('userImage'), isImageValidation,  userController.UserSignUp);
router.post('/login', userController.UserLogin);

router.patch('/forgetpassword', userController.UserForgetPassword);

router.post('/emailverify', userController.UserEmailVerify);
router.post('/otpverify', userController.UserOTPVerify);

module.exports = router;
