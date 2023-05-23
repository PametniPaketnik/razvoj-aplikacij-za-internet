var HistoryModel = require('../../models/historyModel.js');

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
                return res.json(histories);
            });
    },
};
