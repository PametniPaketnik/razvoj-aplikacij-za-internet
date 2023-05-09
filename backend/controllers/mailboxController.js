var MailBoxModel = require('../models/mailboxModel.js');


module.exports = {


    /**
     * MailBoxModel.list()
     */
    list: function (req, res) {
        MailBoxModel.find(function (err, mailBox) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(mailBox);
        });
    },

    /**
     * MailBoxModel.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        MailBoxModel.findOne({_id: id}, function (err, mailbox) {
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



}