var HistoryModel = require('../../models/historyModel.js');

module.exports = {
    getAll: function (req, res) {
        HistoryModel.find()
            .populate('parentMailBox')
            .exec(function (err, histories) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting histories.',
                        error: err
                    });
                }

                return res.json(histories);
            });
    },

    get: function (req, res) {
        var id = req.params.id;

        HistoryModel.find({parentMailBox: id}, function (err, history) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting history.',
                    error: err
                });
            }

            if (!history) {
                return res.status(404).json({
                    message: 'No such history'
                });
            }

            return res.json(history);
        });
    },
};
