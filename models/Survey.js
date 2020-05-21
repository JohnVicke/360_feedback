/**
 * Model class for survey. Represents a survey object that exists in the survey collection.
 */

const mongoose = require('mongoose');

/**
 * Defines all fields that a survey has.
 */
const surveySchema = mongoose.Schema(
    {
        active: {type: Boolean, required: true},
        e_id: {type: mongoose.Schema.ObjectId, required: false},
        created_date: {type: Date, required: true},
        end_date: {type: Date, required: true},
        template_id: {type: mongoose.Schema.ObjectId, required: false},
        responses: {type: Array, required: true},
        creator: {type: mongoose.Schema.ObjectId, required: false},
    },
    // needed because otherwise the collection wont be found.
    {collection: 'survey'},
);

module.exports = mongoose.model('survey', surveySchema);
