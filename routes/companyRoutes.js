const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

const {
    getAll,
    postCompany,
    getCompanyById,
    deleteCompany,
    editCompany
} = companyController;

router.get('/', getAll);

module.exports = router;
