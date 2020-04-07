const mongoose = require('mongoose');

const companyAdvertiserSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    orgNr: {
        type: Number,
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
        type: Number,
        required: true
    },

    billingAddress: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('companies', companyAdvertiserSchema);
