const Company = require('../models/companyAdvertiser');

getAll = async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.json({ message: err });
    }
};

module.exports = {
    getAll
};
