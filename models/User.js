/**
 * Model class for user. Represents a user object that exists in the user collection.
 */

const mongoose = require('mongoose');

/**
 * Defines all fields that a user has.
 */
const userSchema = mongoose.Schema({
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    role: { type: String, required: true },
    picture: { type: String, required: false },
    responses: { type: Array, required: true },
    email: { type: String, required: true },
});

module.exports = mongoose.model('users', userSchema);
