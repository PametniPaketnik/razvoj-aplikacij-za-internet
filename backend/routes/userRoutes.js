var express = require('express');

var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var userController = require('../controllers/userController.js');

router.get('/', userController.list);
//router.get('/register', userController.showRegister);
//router.get('/login', userController.showLogin);
router.get('/profile', userController.profile);
router.get('/logout', userController.logout);
router.get('/:id', userController.show);

router.post('/', upload.single('image'), userController.create);
router.post('/login', userController.login);

router.put('/:id', upload.none(), userController.update);

router.delete('/:id', userController.remove);

module.exports = router;
