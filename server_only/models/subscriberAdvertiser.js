const mongoose = require('mongoose');

const subscriberAdvertiserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    phoneNr: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    zipCode: {
        type: String,
        required: true
    },

    deliveryAddress: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('subscribers', subscriberAdvertiserSchema);
