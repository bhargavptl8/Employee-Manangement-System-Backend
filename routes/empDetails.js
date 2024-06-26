var express = require('express');
var router = express.Router();
const multer = require('multer')
const empdetailsController = require('../controller/empDetails');
const userAuthentication = require('../authentication/user');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file?.originalname)
  }
})

const upload = multer({ storage })

const isImageValidation = (req, res, next) => {

  try {

    if (req.file) {
      let imageFileExtension = ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp', 'apng', 'avif', 'gif'];

      let fileExtension = req.file?.originalname.split('.').reverse()[0];

      if (!imageFileExtension.includes(fileExtension)) {
        throw new Error(`${fileExtension} is not Image`);
      }

    }

    next();

  } catch (error) {

    res.status(404).json({
      status: 'Fail',
      message: error.message
    })
  }
}

router.post('/create', userAuthentication.sequre, upload.single('empImage'), isImageValidation, empdetailsController.EmployeeDetailsCreate);
router.get('/find', userAuthentication.sequre, empdetailsController.EmployeeDetailsFind);
router.delete('/delete/:empDetailID', userAuthentication.sequre, empdetailsController.EmployeeDetailsDelete);
router.patch('/update/:empDetailID', userAuthentication.sequre, upload.single('empImage'), isImageValidation, empdetailsController.EmployeeDetailsUpdate);
router.get('/search', userAuthentication.sequre, empdetailsController.EmployeeDetailsSearching);

module.exports = router;
