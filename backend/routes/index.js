var express = require('express');
var router = express.Router();
var mailboxController = require('../controllers/mailboxController.js');

router.get('/', mailboxController.list);
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = router;
