/**
 * Model class for template. Represents a template object that exists in the template collection.
 */

const mongoose = require('mongoose');

/**
 * Defines all fields that a template has.
 */
const templateSchema = mongoose.Schema(
    {
        sections: { type: Array, required: true },
        created: { type: Date, required: true },
        last_used: { type: Date, required: true },
        name: { type: String, required: true },
        description: { type: String, required: false },
        creator: { type: mongoose.Schema.ObjectId, required: true },
    },
    // needed because otherwise the collection wont be found.
    { collection: 'template' }
);

module.exports = mongoose.model('template', templateSchema);
