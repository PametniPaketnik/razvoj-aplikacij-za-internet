var HistoryModel = require('../models/historyModel.js');

module.exports = {
    list: function (req, res) {
        HistoryModel.find()
            .populate('parentMailBox')
            .exec(function (err, histories) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting histories.',
                        error: err
                    });
                }
                var data = [];
                data.histories = histories;
                //return res.render('history/list', data);
                return res.json(histories);
            });
    },

    showByParentMailbox: function (req, res) {
        var id = req.params.id;

        HistoryModel.find({parentMailBox: id}, function (err, mailbox) {
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
};
