/**
 * Controller class for user. Sets up all the functions to communicate with the database collection user.
 */
const User = require('../models/User');

/**
 * Gets all users from collection.
 */
getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch {
        res.json({ message: err });
    }
};

/**
 * Gets an id specified user from collection.
 */
getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
};

/**
 * Gets an email specified user from collection.
 */
getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.id });
        res.json(user);
    } catch {
        res.json({ message: err });
    }
};

/**
 * Inserts a new user in the user collection.
 */
createUser = (req, res) => {
    const body = req.body;

    // Return error message if no body is provided.
    if (!body) {
        return res
            .status(400)
            .json({ success: false, error: 'You must provide a user!' });
    }

    const user = new User(body);

    // Return error if user couldn't be created.
    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            });
        });
};

/**
 * Updates a user in the user collection.
 */
updateUser = async (req, res) => {
    const body = req.body;

    // Return error message if no body is provided.
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user to update!',
        });
    }

    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            });
        }

        // Updates the fields for the user and saves it in the database.
        user.given_name = body.given_name;
        user.family_name = body.family_name;
        user.role = body.role;
        user.picture = body.picture;
        user.responses = body.responses;
        user.email = body.email;
        user.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                });
            })
            .catch((error) => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                });
            });
    });
};

/**
 * Finds a user by id and deletes it.
 */
deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        // Returns error in case of some unexpected error.
        if (err) {
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
        // Returns error if no user was found.
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found!',
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });
    }).catch((err) => console.log(err));
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};
