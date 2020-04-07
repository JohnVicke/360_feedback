const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    header: {
        type: String,
        required: true
    },

    ad_price: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('ads', adSchema);
