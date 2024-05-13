var express = require('express');
const admin = require('../controller/admin');
const auth = require('../middleware/auth');
var router = express.Router();
const multer = require('multer');
/* GET home page. */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage })
router.post('/register',upload.single('image'),admin.add_admin);
router.post('/register',admin.add_admin);
router.post('/admin_update/:id',auth.check_token,admin.admin_update);
router.get('/admin_update/:id',auth.check_token,admin.viewadmin_update);

router.get('/admin_delete/:id',auth.check_token,admin.admin_delete);
router.post('/admin_login',admin.admin_login);
router.get('/view_admin',auth.check_token,admin.view_admin);
router.get('/find_admin',auth.check_token,admin.find_admin);
router.get('/logout_admin',admin.logoutadmin);
module.exports = router;
