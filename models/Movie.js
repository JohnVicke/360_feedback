const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        genre: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            required: true
        },
        imgSrc: {
            type: String,
            required: true
        }
    },
    { collection: 'movies' }
);

module.exports = mongoose.model('Movies', MovieSchema);
