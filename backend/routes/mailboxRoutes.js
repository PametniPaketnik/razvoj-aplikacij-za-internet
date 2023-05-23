var express = require('express');
var router = express.Router();
var mailboxController = require('../controllers/mailboxController.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/', mailboxController.list);

//router.get('/publish', requiresLogin, mailboxController.publish);
router.get('/update/:id', requiresLogin, mailboxController.update);
router.get('/:id', mailboxController.show);

router.post('/', mailboxController.create);

//router.put('/:id', mailboxController.update);

router.delete('/delete/:id', mailboxController.remove);

module.exports = router;
