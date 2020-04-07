const Subscriber = require('../models/subscriberAdvertiser');

getAll = async (req, res) => {
    try {
        const companies = await Subscriber.find();
        res.json(companies);
    } catch (err) {
        res.json({ message: err });
    }
};

module.exports = {
    getAll
};
