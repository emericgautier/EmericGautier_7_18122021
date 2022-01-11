const express = require('express');

const router = express.Router();

const multer = require('../middleware/multer'); 
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/user/register', userCtrl.register);
router.post('/user/login', userCtrl.login);

router.get('/user/auth', auth, userCtrl.getUserData);
router.get('/user/owner', auth, userCtrl.verifyUser);
router.get('/user/', auth, userCtrl.getProfile);

router.post('/user/logout', auth, userCtrl.logout);

router.put('/user/picture', auth, multer, userCtrl.changePicture);
router.put('/user/banner', auth, multer, userCtrl.changeBanner);
router.put('/user/update', auth, userCtrl.updateProfile);

router.delete('/user/delete', auth, userCtrl.deleteProfile);

module.exports = router;