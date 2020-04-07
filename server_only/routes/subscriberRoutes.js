const express = require('express');
const router = express.Router();
const companyController = require('../controllers/subscriberController');

const {
    getAll,
    postSubscriber,
    getSubscriberById,
    deleteSubscriber,
    editSubscriber
} = companyController;

router.get('/', getAll);

module.exports = router;
