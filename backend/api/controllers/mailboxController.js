var MailBoxModel = require('../../models/mailboxModel.js');
var HistoryModel = require('../../models/historyModel.js');

module.exports = {
    getAll: function (req, res) {
        MailBoxModel.find()
            .populate('userId')
            .exec(function (err, mailboxes) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting mailboxes.',
                        error: err
                    });
                }

                return res.json(mailboxes);
            });
    },

    get: function (req, res) {
        var id = req.params.id;

        MailBoxModel.findOne({boxID: id})
            .populate('userId')
            .exec(function (err, mailbox) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting mailbox.',
                        error: err
                    });
                }

                if (!mailbox) {
                    return res.status(404).json({
                        message: 'No such mailbox'
                    });
                }

                return res.json(mailbox);
            });
    },

    /**
    * mailboxController.create()
    */
    create: function (req, res) {
        var mailbox = new MailBoxModel({
            name : req.body.name,
            street : req.body.street,
            postcode : req.body.postcode,
            post : req.body.post,
            open : req.body.open,
            date : new Date(),
            userId : req.session.userId
        });

        mailbox.save(function (err, mailbox) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating mailbox',
                    error: err
                });
            }
            // return res.redirect('/mailboxes');
            // return res.status(201).json(mailbox);
            return res.json(mailbox);
        });
    },

    /**
    * mailboxController.update()
    */
    update: function (req, res) {
        var id = req.params.id;

        MailBoxModel.findOne({_id: id}, function (err, mailbox) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting mailbox',
                    error: err
                });
            }

            if (!mailbox) {
                return res.status(404).json({
                    message: 'No such mailbox'
                });
            }

            mailbox.name = req.body.name ? req.body.name : mailbox.name;
            mailbox.street = req.body.street ? req.body.street : mailbox.street;
            mailbox.postcode = req.body.postcode ? req.body.postcode : mailbox.postcode;
            mailbox.post = req.body.post ? req.body.post : mailbox.post;
            mailbox.open = req.body.open ? req.body.open : mailbox.open;
            mailbox.date = req.body.date ? req.body.date : mailbox.date;
            mailbox.userId = req.body.userId ? req.body.userId : mailbox.userId;

            mailbox.save(function (err, mailbox) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating mailbox.',
                        error: err
                    });
                }

                return res.json(mailbox);
            });
        });
    },

    /**
    * mailboxController.remove()
    */
    remove: function (req, res) {
        var id = req.params.id;

        MailBoxModel.findByIdAndRemove(id, function (err, mailbox) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the mailbox.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
};
