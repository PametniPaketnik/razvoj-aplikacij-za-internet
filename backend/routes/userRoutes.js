var express = require('express');

var multer = require('multer');
//var upload = multer({dest: 'public/images/'});
var upload = multer({
    dest: 'public/images/',
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images/');
        },
        filename: function (req, file, cb) {
            // Use the username as the filename
            const username = req.body.username; // Assuming the username is sent in the request body
            cb(null, username + '.jpg');
        }
    })
});

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
