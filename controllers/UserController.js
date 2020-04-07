const User = require('../models/User');

getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch {
        res.json({ message: err });
    }
};

module.exports = {
    getAllUsers,
};
