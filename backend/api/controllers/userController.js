var UserModel = require('../../models/userModel.js');
var bcrypt = require('bcrypt');

const geocodeAddress = async (address, postcode) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&
        street=${encodeURIComponent(address)}&
        postalcode=${encodeURIComponent(postcode)}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    else {
        throw new Error('Address not found' + address + postcode);
    }
};

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
    /**
     * userController.getAll()
     */
    getAll: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.get()
     */
    get: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    /**
     * userController.register()
     */
    register: async function (req, res) {
        const { lat, lng } = await geocodeAddress(req.body.street, req.body.postCode);

        var user = new UserModel({
			username : req.body.username,
			password : req.body.password,
            email : req.body.email,
			firstName : req.body.firstName,
            lastName : req.body.lastName,
            tel : req.body.tel,
            street : req.body.street,
            postcode : req.body.postCode,
            lat: lat,
            lng: lng
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        console.log(req.body.firstname)

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

			user.email = req.body.email ? req.body.email : user.email;
            user.firstName = req.body.firstname ? req.body.firstname : user.firstName;
            user.lastName = req.body.lastname ? req.body.lastname : user.lastName;
            user.tel = req.body.tel ? req.body.tel : user.tel;
            user.street = req.body.street ? req.body.street : user.street;
            user.postcode = req.body.postcode ? req.body.postcode : user.postcode;
            user.post = req.body.post ? req.body.post : user.post;
            user.lat = req.body.lat;
            user.lng = req.body.lng;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    login: function(req, res, next){
        var username = req.body.username;
        var password = req.body.password;

        UserModel.findOne({ username: username }, function (err, user) {
            if (err || !user) {
                var err = new Error('Wrong username');
                err.status = 401;
                return next(err);
            }

            // Compare the submitted password with the stored hash
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err || !isMatch) {
                    var err = new Error('Wrong password');
                    err.status = 401;
                    console.log(err)
                    return next(err);
                }

                return res.json(user);
            });
        });
    },

    profile: function(req, res,next){
        UserModel.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                return next(error);
            }
            else {
                if(user===null){
                    var err = new Error('Not authorized, go back!');
                    err.status = 400;
                    return next(err);
                }
                else {
                    //return res.render('user/profile', user);
                    return res.json(user);
                }
            }
        });  
    },

    logout: function(req, res, next){
        if(req.session){
            req.session.destroy(function(err){
                if(err){
                    return next(err);
                } 
                else {
                    return res.status(201).json({});
                }
            });
        }
    }
};
