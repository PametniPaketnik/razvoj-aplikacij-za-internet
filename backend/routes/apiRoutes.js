var express = require('express');
var router = express.Router();
var mailboxController = require('../api/controllers/mailboxController.js');
var userController = require('../api/controllers/userController.js');
var historyController = require('../api/controllers/historyController.js')

router.get('/mailbox/', mailboxController.getAll);
router.get('/mailbox/:id', mailboxController.get);

router.get('/user/', userController.getAll);
router.get('/user/:id', userController.get);
router.post('/user/login', userController.login);
router.post('/user/logout', userController.logout);

router.get('/history/', historyController.getAll);
router.get('/history/:id', historyController.get);

module.exports = router;
