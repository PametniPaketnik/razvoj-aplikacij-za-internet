var express = require('express');
var router = express.Router();
var mailboxController = require('../api/controllers/mailboxController.js');
var userController = require('../api/controllers/userController.js');

router.get('/mailbox/', mailboxController.getAll);
router.get('/mailbox/:id', mailboxController.get);

router.get('/user/', userController.getAll);
router.get('/user/:id', userController.get);
router.post('/user/login', userController.login);
router.post('/user/logout', userController.logout);

module.exports = router;
