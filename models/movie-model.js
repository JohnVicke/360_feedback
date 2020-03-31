const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = new Schema(
    {
        name: { type: String, required: true},
        time: { type: Array, required: true},
        rating: { type: Number, required: true},
    },
    {timestamps: true},
);

module.exports = mongoose.model('bad-movies', Movie);