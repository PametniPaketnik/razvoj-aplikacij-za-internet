var MailBoxModel = require('../models/mailboxModel.js');
var HistoryModel = require('../models/historyModel.js');

module.exports = {
    /**
     * MailBoxModel.list()
     */
    list: function (req, res) {
        MailBoxModel.find()
            .populate('userId')
            .populate('mailboxUser')
            .exec(function (err, mailboxes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting mailboxes.',
                    error: err
                });
            }
            var data = [];
            data.mailboxes = mailboxes;
            //return res.render('mailbox/list', data);
            return res.json(mailboxes);
        });
    },
    /**
     * MailBoxModel.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        MailBoxModel.findOne({_id: id})
            .populate('userId')
            .populate('mailboxUser')
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

            HistoryModel.find({ parentMailBox: id })
                .populate('parentMailBox')
                .exec(function(err, histories) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting histories.',
                            error: err
                        });
                    }

            var data = {
                mailbox: mailbox,
                histories: histories,
            };
            //return res.render('mailbox/show', data);
            return res.json(mailbox);
            });
        });
    },

    showByMailboxUser: function (req, res) {
        var id = req.params.id;

        MailBoxModel.find({mailboxUser: id})
            .populate('mailboxUser')
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
            boxID : req.body.boxID,
            street : req.body.street,
            postcode : req.body.postcode,
            post : req.body.post,
            open : req.body.open,
            date : new Date(),
            userId : req.session.userId,
            mailboxUser : req.body.mailboxUser
        });

        mailbox.save(function (err, mailbox) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating mailbox',
                    error: err
                });
            }
            //return res.redirect('/mailboxes');
            return res.status(201).json(mailbox);
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

            mailbox.boxID = req.body.boxID ? req.body.boxID : mailbox.boxID;
            mailbox.street = req.body.street ? req.body.street : mailbox.street;
            mailbox.postcode = req.body.postcode ? req.body.postcode : mailbox.postcode;
            mailbox.post = req.body.post ? req.body.post : mailbox.post;
            mailbox.open = req.body.open ? req.body.open : mailbox.open;
            mailbox.mailboxUser = req.body.mailboxUser ? req.body.mailboxUser : mailbox.mailboxUser;

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

            HistoryModel.deleteMany({ parentMailBox: id}, function (err) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when deleting histories for the mailbox.',
                        error: err
                    });
                }

                return res.status(204).json();
            });
        });
    },

    publish: function(req, res){
        return res.render('mailbox/publish');
    },

    /*update: function(req, res){
        return res.render('mailbox/update');
    }*/
};
