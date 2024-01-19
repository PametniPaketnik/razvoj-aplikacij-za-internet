var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({dest: 'public/mailboxes/'});
var uploadUserImage = multer({dest: 'public/userImages/'});

var mailboxController = require('../api/controllers/mailboxController.js');
var userController = require('../api/controllers/userController.js');
var historyController = require('../api/controllers/historyController.js')
var faceDetectionController = require('../api/controllers/faceDetectionController.js');
var CDController = require('../api/controllers/CDController.js');

router.get('/mailbox/', mailboxController.getAll);
router.get('/mailbox/:id', mailboxController.get);

router.get('/user/', userController.getAll);
router.get('/user/:id', userController.get);
router.post('/user/login', userController.login);
router.post('/user/register', userController.register);
router.post('/user/logout', userController.logout);

router.get('/history/', historyController.getAll);
router.get('/history/:id', historyController.get);
router.post('/history/', upload.none(), historyController.add);

router.post('/facedetection', uploadUserImage.single('image'), faceDetectionController.detect);
router.post('/CD', uploadUserImage.single('image'), CDController.detect);

module.exports = router;
