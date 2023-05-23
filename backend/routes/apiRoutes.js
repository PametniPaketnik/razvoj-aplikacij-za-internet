var express = require('express');
var router = express.Router();
var mailboxController = require('../api/controllers/mailboxController.js');

router.get('/mailbox/', mailboxController.getAll);
router.get('/mailbox/:id', mailboxController.get);

module.exports = router;
