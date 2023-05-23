var express = require('express');
var router = express.Router();
var historyController = require('../controllers/historyController.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/', historyController.list);

router.get('/byParentMailbox/:id', historyController.showByParentMailbox);

module.exports = router;
