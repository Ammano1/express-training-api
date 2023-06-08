const Train = require('../models/train');

exports.getTrains = (req, res, next) => {
    Train.fetchAll(trains => {
        res.status(200).json(trains);
    })
};